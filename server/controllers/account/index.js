const User = require("../../models/User");
const bcrypt = require('bcrypt')

const changePassword = async (req, res) => {
    try {
        const { name, wallet } = req.auth;
        console.log('req.auth: ', req.auth);
        console.log('body: ', req.body.password)
        const user = await User.findOne({ name: name });
        console.log('user ', user)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        user.password = hashedPassword;
        await user.save();
        console.log('success')
        res.json('success');
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
}

const changeAccount = async (req, res) => {
    try {
        const { name, wallet } = req.auth;
        console.log('newName: ', req.body.newName);
        const checkName = await User.findOne({ name: req.body.newName })
        if (checkName)
            res.status(400).json('The name is already chosen. Please choose another name.');
        else {
            const user = await User.findOne({ name: name });
            user.name = req.body.newName;
            await user.save();
            console.log('success')
            res.json('success');
        }

    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
}

module.exports = {
    changeAccount,
    changePassword,
}