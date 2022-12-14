const ethers = require('ethers');
const User = require("../../models/User");
const { FEE } = require('../../constants');
const { calcEtherToUsd, calcUsdToEther } = require('../../apis/priceConvert');
const privateKey = process.env.PRIVATE_KEY || ''
const adminName = process.env.ADMIN_NAME || ''
// Display All User Data
const balance_index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 4;
        const skip = (page - 1) * pageSize;
        const total = await User.countDocuments();

        const pages = Math.ceil(total / pageSize);
        query = await User.find().skip(skip).limit(pageSize);

        if (page > pages) {
            return res.status(404).json({
                status: "fail",
                message: "No page found",
            });
        }
        const result = await query;
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Server Error",
        });
    }
};

// Show a particular Balance Detail by name
const balance_details = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.auth.name });
        if (user) {
            res.json(await calcEtherToUsd(user.balance));
        }
    } catch (error) {
        res.json(error);
    }
};

const deposit = async (req, res) => {
    try {
        const name = req.auth.name;
        const amount = req.body.amount;
        const user = await User.findOne({ name: name });
        user.balance = user.balance + Number(amount);
        await user.save();
        await saveHistory({ name: name, description: "Desposited ETH", category: 'Deposit', amount: amount });
        res.json("success");
    }
    catch (error) {
        res.json(error);
    }
}

const getAvailability = async (req, res) => {
    try {
        const name = req.query.name;
        const user = await User.findOne({ name: name });
        if (user.pay_date == undefined)
            res.json({ availability: false });
        else {
            const passed = new Date().getTime() - new Date(user.pay_date).getTime();
            const hours = (Math.floor((passed) / 1000)) / 3600;
            if (hours <= 24) {
                res.json({ availability: true });
            }
            else
                res.json({ availability: false });
        }
    }
    catch (error) {
        res.json(error);
    }
}

const withdraw = async (req, res) => {
    try {
        const name = req.auth.name;
        const to_address = req.auth.wallet;
        const user = await User.findOne({ name: name });
        if (user.balance < req.body.amount) {
            res.json('insufficient amount');
        }
        else {
            amount = ethers.utils.parseEther(req.body.amount.toString());
            // const ethProvider = new ethers.providers.InfuraProvider("goerli");
            const ethProvider = new ethers.getDefaultProvider();
            const wallet = new ethers.Wallet(privateKey, ethProvider);
            const gasPrice = await ethProvider.getGasPrice();
            const estimateGas = await ethProvider.estimateGas({
                to: to_address,
                value: amount,
            });

            const estimateTxFee = (gasPrice).mul(estimateGas); // mainnet: GasFee = (baseFee + Tip) * gasUnits ----- EIP1559 formula

            let sendAmount = amount.sub(estimateTxFee);
            const tx = {
                gasLimit: estimateGas,
                gasPrice: gasPrice,
                to: to_address,
                value: sendAmount,
            };

            try {
                const txResult = await wallet.sendTransaction(tx);
                const result = await txResult.wait();
                if (result.status) {
                    user.balance = user.balance - req.body.amount;
                    await user.save();
                    await saveHistory({ name: name, description: 'Withdraw ETH', category: 'Withdraw', amount: req.body.amount })
                    res.json('success');
                }
                else {
                }
            }
            catch (error) {
                res.json(error);
            }
        }
    } catch (error) {
        res.json(error)
    }
}

const payGameFee = async (req, res) => {
    try {
        const name = req.body.name
        const user = await User.findOne({ name: name });

        const feeInEther = await calcUsdToEther(FEE)
        if (user.balance <= feeInEther)
            res.json("Not enough Balance")
        user.balance = user.balance - feeInEther;
        user.pay_date = new Date()
        user.count += 1;
        await user.save();

        admin = await User.findOne({ name: adminName });
        admin.balance += feeInEther;
        await admin.save();

        await saveHistory({ name: name, description: 'pay FEE', category: 'Fee', amount: await calcUsdToEther(FEE) })
        res.json('success');
    }
    catch (error) {
        res.json(error)
    }
}

async function gameEnd(username1, username2, roomAmount) {

    const name1 = username1;
    const name2 = username2;
    const amount = roomAmount;
    try {
        const user1 = await User.findOne({ name: name1 });
        const user2 = await User.findOne({ name: name2 });
        if (user2.balance <= await calcUsdToEther(amount))
            return false;
        else {
            user1.balance += await calcUsdToEther(amount);
            user2.balance -= await calcUsdToEther(amount);
            await user1.save()
            await user2.save()
            await saveHistory({ name: name1, description: 'Wins the game', category: 'Winner', amount: await calcUsdToEther(amount) })
            await saveHistory({ name: name2, description: 'Loses the game', category: 'Loser', amount: await calcUsdToEther(amount) })
            return true;
        }
    } catch (error) {
        return false;
    }
}

const saveHistory = async (data) => {
    try {
        const user = await User.findOne({ name: data.name })
        newHistory = {
            description: data.description,
            category: data.category,
            amount: data.amount
        },
            user.history.unshift(newHistory)
        await user.save()
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    balance_index,
    balance_details,
    withdraw,
    deposit,
    payGameFee,
    gameEnd,
    getAvailability,
    calcEtherToUsd,
    calcUsdToEther,
};