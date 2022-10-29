const bcrypt = require('bcrypt')
const User = require('../../models/User')

const { signToken } = require('../../middlewares/authMiddleware')

const register = async (request, response) => {
    console.log('body: ', request.body);
    const { name, password, wallet } = request.body
    if (name == undefined || password == undefined || wallet == undefined) {
        response.status(400).json({
            error: 'request body',
            message: `insufficient params`,
        })
    }
    else {
        try {
            console.log('-------------------')
            const user = await User.findOne({ name })
            if (user) {
                return response.status(400).json({
                    error: name,
                    message: `An account already exists with ${name}`,
                })
            }

            // Encrypt password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // Create account
            const newUser = new User({ name: name, password: hashedPassword, wallet: wallet })
            await newUser.save()

            // Remove password from response data
            newUser.password = undefined
            delete newUser.password

            // Generate access token
            const token = signToken({ name: name, wallet: wallet })

            response.status(201).json({
                message: 'Succesfully registered',
                data: newUser,
                token,
            })
        }
        catch (error) {
            console.error(error)
            return response.status(500).send()
        }
    }
}

const login = async (request, response) => {
    const { name, password, wallet } = request.body
    if (name == undefined || password == undefined || wallet == undefined) {
        response.status(400).json({
            error: 'request body',
            message: `insufficient params`,
        })
    }
    else {
        try {
            const { name, password, wallet } = request.body;
            const user = await User.findOne({ name });
            if (!user) {
                return response.status(400).json({
                    message: "Unregistered User",
                });
            }

            const passOk = await bcrypt.compare(password, user.password);
            if (!passOk) {
                return response.status(400).json({
                    message: "Password doesn't match",
                });
            }

            if (wallet != user.wallet) {
                return response.status(400).json({
                    message: "plz use registered wallet",
                });
            }

            // Remove password from response data
            user.password = undefined;
            delete user.password;

            // Generate access token
            const token = signToken({ name: name, wallet: wallet });

            response.status(200).json({
                message: "Succesfully logged-in",
                data: user,
                token,
            });
        } catch (error) {
            console.error(error);
            response.status(500).send(error);
        }
    }
}

const getAccount = async (request, response) => {
    try {
        const { name, wallet } = request.auth
        const user = await User.findOne({ name: name }).select('-password')

        // Generate access token
        const token = signToken({ name: name, wallet: wallet })

        response.status(200).json({
            message: 'Account fetched',
            data: user,
            token,
        })
    } catch (error) {
        console.error(error)
        response.status(500).send()
    }
}

const changePassword = async (req, res) => {
    try {
        const { name, wallet } = req.auth;
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
            const newUser = await User.findOne({ name: req.body.newName }).select('-password')
            const token = signToken({ name: newUser.name, wallet: wallet });
            res.status(200).json({
                message: "success",
                data: user,
                token,
            });
        }

    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
}

module.exports = {
    register,
    login,
    getAccount,
    changeAccount,
    changePassword,
}