const Balance = require("../../models/Balance");
const ethers = require('ethers');
const FEE = 0.001;
const privateKey = '5a8936e251bd516190919bcd9b7a425ddb85209e27f90ef65635edb3b4a39859';

// Display All Balance Data
const balance_index = async (req, res) => {
    try {
        let query = Balance.find();

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 4;
        const skip = (page - 1) * pageSize;
        const total = await Balance.countDocuments();

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

// Create New Balance
const balance_create_post = (req, res) => {
    let balance = new Balance(req.body);
    console.log('balance: ', balance);
    balance
        .save()
        .then((balance) => {
            res.send(balance);
        })
        .catch(function (err) {
            res.status(422).send(err.message);
        });
};

// Show a particular Balance Detail by name
const balance_details = (req, res) => {
    console.log('data: ', req.params.name);
    Balance.findOne({ name: req.params.name }, function (err, balance) {
        if (!balance) {
            res.status(404).send("No result found");
        } else {
            const total = new Date().getTime() - new Date(balance.pay_date).getTime();
            const hours = (Math.floor((total) / 1000)) / 3600;
            console.log(hours);
            res.json(balance);
        }
    });
};

const deposit = async (req, res) => {
    const name = req.body.username;
    const amount = req.body.amount;
    user = await Balance.findOne({ name: name });
    user.balance = user.balance + Number(amount);
    const newHistory = {
        message: "Deposited " + amount + ' ETH'
    }
    user.history.unshift(newHistory);
    await user.save();
    res.json(newHistory.message);
}

const withdraw = async (req, res) => {
    console.log('body:', req.body);
    withdrawETH(req.body.name, req.body.amount);
    amount = ethers.utils.parseEther(req.body.amount.toString());
    to_address = req.body.address;

    const ethProvider = new ethers.providers.InfuraProvider("mainnet");

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
        if (result.status) {
            console.log("sending transaction confirmed!");
            withdrawETH(req.body.name, req.body.amount);
        }
        else {
        }
    }
    catch (error) {
        console.log(error);
    }
}

const withdrawETH = async (name, amount) => {
    user = await Balance.findOne({ name: name });
    console.log('balance: ', user.balance);
    if (user.balance < Number(amount))
        console.log("Insufficient Amount");
    else {
        user.balance = user.balance - Number(amount);
        const newHistory = {
            message: "Withdrawed " + amount + ' ETH'
        }
        user.history.unshift(newHistory);
        await user.save();
        console.log(await Balance.findOne({ name: name }));
    }
}

const payGameFee = async (req, res) => {
    const name = req.body.name;
    user = await Balance.findOne({ name: name });
    console.log('balance: ', user.balance);
    if (user.balance < FEE)
        res.json("Not enough FEE.")
    user.balance = user.balance - FEE;
    const newHistory = {
        message: "Payed " + FEE + ' ETH As FEE'
    }
    user.history.unshift(newHistory);
    await user.save();
    res.json(newHistory.message);
}

const gameEnd = async (req, res) => {
    const name1 = req.body.player1;
    const name2 = req.body.player2;
    const amount = req.body.amount;

    user1 = await Balance.findOne({ name: name1 });
    user2 = await Balance.findOne({ name: name2 });
    if (user2.balance < amount)
        res.json('insufficeient Amount');
    else {
        user1.balance += amount;
        user2.balance -= amount;
        newHistory1 = {
            message: "Wins in " + amount + "ETH game room"
        }
        newHistory2 = {
            message: "loses in " + amount + "ETH game room"
        }
        user1.history.unshift(newHistory1);
        user2.history.unshift(newHistory2);
        await user1.save()
        await user2.save()
        res.json('Success');
    }

}

module.exports = {
    balance_index,
    balance_details,
    balance_create_post,
    withdraw,
    deposit,
    payGameFee,
    gameEnd,
};