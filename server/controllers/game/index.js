const Image = require("../../models/Image");
const User = require("../../models/User");
const { calcUsdToEther } = require("../../apis/priceConvert");
const baseRoomUrl = "room/";
const min = 100000;
const max = 900000;

const { PRICE1, PRICE2, PRICE3 } = require("../../constants/index");
let flag1 = true;
let flag2 = true;
let flag3 = true;

let player1;
let player2;
let player3;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function loadData() {
    try {
        const randomNumber = randomIntFromInterval(1, 99);
        const item = await Image.findOne({ ID: randomNumber });
        const data = {
            url: item.Url,
            description: item.Description,
            price: item.Price,
        };
        return data;
    } catch (error) {
        const item = await Image.findOne({ ID: 2 });
        const data = {
            url: item.Url,
            description: item.Description,
            price: item.Price,
        };
        return data;
    }
}

const joinRoom = async (req, res) => {
    try {
        const name = req.auth.name;
        const amount = req.body.amount;
        const user = await User.findOne({ name: name });
        if (!user) {
            res.json("Invalid User");
        }
        const ttt = await calcUsdToEther(amount);

        if (user.balance < ttt) {
            res.json('can not join this room');
        }
        else {
            const url = baseRoomUrl + '#' + amount + name + randomIntFromInterval(min, max);
            let data;
            if (PRICE1 == amount) {
                if (flag1 == true) {
                    player1 = name;
                    rooms1 = url;
                    flag1 = false
                    data = {
                        user1: name,
                        user2: '',
                        amount: amount,
                        url: rooms1,
                        isFull: false
                    }
                    res.json(data);
                }
                else {
                    flag1 = true;
                    data = {
                        user1: player1,
                        user2: name,
                        amount: amount,
                        url: rooms1,
                        isFull: true
                    }
                    res.json(data);
                }
            }
            if (PRICE2 == amount) {
                if (flag2 == true) {
                    rooms2 = url;
                    player2 = name;
                    flag2 = false
                    data = {
                        user1: name,
                        user2: '',
                        amount: amount,
                        url: rooms2,
                        isFull: false
                    }
                    res.json(data);
                }
                else {
                    flag2 = true
                    data = {
                        user1: player2,
                        user2: name,
                        amount: amount,
                        url: rooms2,
                        isFull: true
                    }
                    res.json(data);
                }
            }
            if (PRICE3 == amount) {
                if (flag3 == true) {
                    rooms3 = url
                    player3 = name
                    flag3 = false
                    data = {
                        user1: player3,
                        user2: '',
                        amount: amount,
                        url: rooms3,
                        isFull: false
                    }
                    res.json(data);
                }
                else {
                    flag3 = true
                    data = {
                        user1: player3,
                        user2: name,
                        amount: amount,
                        url: rooms3,
                        isFull: true
                    }
                    res.json(data);
                }
            }
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
};

const leaveRoom = async (req, res) => {
    const name = req.body.name;
    const amount = req.body.amount;
    if (amount == PRICE1) {
        if (flag1 == false && player1 == name) flag1 = true;
    } else if (amount == PRICE2) {
        if (flag2 == false && player2 == name) flag2 = true;
    } else {
        if (flag3 == false && player3 == name) flag3 = true;
    }
    res.json("success");
};

module.exports = {
    loadData,
    joinRoom,
    leaveRoom,
};
