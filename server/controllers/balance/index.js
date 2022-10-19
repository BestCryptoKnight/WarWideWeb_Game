const Balance = require("../../models/Balance");

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

// Update Balance Detail by name
const balance_update = (req, res) => {
    const newBalance = {
        pay_date: new Date(),
    }
    Balance.findOneAndUpdate({ name: req.params.name }, newBalance)
        .then(function (balance) {
            res.json(balance);
        })
        .catch(function (err) {
            res.status(422).send("Balance update failed.");
        });
};

// Insert Balance History
const balance_history = async (req, res) => {

    const newHistory = {
        message: req.body.message,
    }

    try {
        const balance = await Balance.findOne({ name: req.body.name });

        balance.history.unshift(newHistory)
        await balance.save()
        res.json(balance)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

module.exports = {
    balance_index,
    balance_details,
    balance_create_post,
    balance_update,
    balance_history,
};