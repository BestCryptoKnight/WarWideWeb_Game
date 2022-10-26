const ethers = require('ethers');
const User = require("../../models/User");
const { FEE } = require('../../constants');
const privateKey = '5a8936e251bd516190919bcd9b7a425ddb85209e27f90ef65635edb3b4a39859';

// Display All User Data
const balance_index = async (req, res) => {
    try {
        let query = await User.find();
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 4;
        const skip = (page - 1) * pageSize;
        const total = await User.countDocuments();

        const pages = Math.ceil(total / pageSize);

        query = query.skip(skip).limit(pageSize);

        if (page > pages) {
            return res.status(404).json({
                status: "fail",
                message: "No page found",
            });
        }

        const result = await query;

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Server Error",
        });
    }
};

// Show a particular Balance Detail by name
const balance_details = (req, res) => {
    try {
        User.findOne({ name: req.auth.name }, function (err, user) {
            console.log('balance: ', user.balance)
            if (!user) {
                res.status(404).send("No result found");
            } else {
                res.json(user.balance);
            }
        });
    } catch (error) {
        res.json(error);
    }

};

const deposit = async (req, res) => {
    try {
        const name = req.auth.name;
        const amount = req.body.amount;
        console.log('name: ', name);
        console.log('amount: ', amount);
        const user = await User.findOne({ name: name });
        user.balance = user.balance + Number(amount);
        await user.save();
        await saveHistory({ name: name, description: "Desposited ETH", category: 'deposit', amount: amount });
        res.json("success");
    }
    catch (error) {
        res.json(error);
    }


}

const getAvailability = async (req, res) => {
    console.log('------------------------------')
    console.log('req: ', req.query.name);
    try {
        const name = req.query.name;
        const user = await User.findOne({ name: name });
        if (user.pay_date == undefined)
            res.json({ availability: false });
        else {
            console.log('--------------')
            const passed = new Date().getTime() - new Date(user.pay_date).getTime();
            const hours = (Math.floor((passed) / 1000)) / 3600;
            if (hours <= 24) {
                res.json({ availability: true });
                console.log(hours)
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
        console.log('wallet: ', to_address);

        const user = await User.findOne({ name: name });
        if (user.balance < req.body.amount) {
            res.json('insufficient amount');
        }
        else {
            amount = ethers.utils.parseEther(req.body.amount.toString());
            //      const to_address = wallet;

            const ethProvider = new ethers.providers.InfuraProvider("goerli");

            const wallet = new ethers.Wallet(privateKey, ethProvider);

            const gasPrice = await ethProvider.getGasPrice();

            const estimateGas = await ethProvider.estimateGas({
                to: to_address,
                value: amount,
            });

            const estimateTxFee = (gasPrice).mul(estimateGas); // mainnet: GasFee = (baseFee + Tip) * gasUnits ----- EIP1559 formula

            let sendAmount = amount.sub(estimateTxFee);

            console.log("gasPrice", " ", Number(gasPrice));
            console.log("balance:", Number(amount));
            console.log("Send pending =>: " + privateKey + "---> " + to_address + ": " + sendAmount + " fee: " + estimateTxFee);

            const tx = {
                gasLimit: estimateGas,
                gasPrice: gasPrice,
                to: to_address,
                value: sendAmount,
            };

            try {
                const txResult = await wallet.sendTransaction(tx);
                const result = await txResult.wait();
                console.log('result: ', result);
                if (result.status) {
                    console.log("sending transaction confirmed!");
                    user.balance = user.balance - req.body.amount;
                    await user.save();
                    await saveHistory({ name: name, description: 'Withdraw ETH', category: 'withdraw', amount: req.body.amount })
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
        console.log('===================')
        const name = req.body.name
        const user = await User.findOne({ name: name });
        console.log('balance: ', user.balance);
        if (user.balance <= FEE)
            res.json("Not enough Balance")
        console.log('User Balance: ', user.balance);
        console.log('FEE: ', FEE);
        user.balance = user.balance - FEE;
        console.log('Fee payed')
        user.pay_date = new Date()
        await user.save();
        await saveHistory({ name: name, description: 'pay FEE', category: 'fee', amount: `${FEE}` })
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
        console.log(user2);
        if (user2.balance <= amount)
            return false;
        else {
            user1.balance += amount;
            user2.balance -= amount;
            await user1.save()
            await user2.save()
            await saveHistory({ name: name1, description: 'Wins the game', category: 'Winner', amount: amount })
            await saveHistory({ name: name2, description: 'Loses the game', category: 'Loser', amount: amount })

            return true;
        }
    } catch (error) {
        return false;
    }
}

const saveHistory = async (data) => {
    try {
        console.log('name: ', data.name);
        const user = await User.findOne({ name: data.name })
        console.log(user);
        newHistory = {
            description: data.description,
            category: data.category,
            amount: data.amount
        },
            user.history.unshift(newHistory)
        await user.save()
        console.log(data);
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
};