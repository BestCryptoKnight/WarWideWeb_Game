const Image = require("../../models/Image");
const User = require('../../models/User');
const baseRoomUrl = 'room/';
const min = 100000;
const max = 900000;

const { PRICE1, PRICE2, PRICE3 } = require('../../constants/index');
let flag1 = true;
let flag2 = true;
let flag3 = true;

let player1
let player2
let player3

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const loadData = async (req, res) => {
    try {
        const randomNumber = randomIntFromInterval(1, 10);
        console.log('random: ', randomNumber);
        const item = await Image.findOne({ ID: randomNumber });

        const data = {
            url: item.Url,
            description: item.Description,
            price: item.Price
        }
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }

}

const joinRoom = async (req, res) => {
    try {
        const name = req.auth.name;
        const amount = req.body.amount;
        const user = await User.findOne({ name: name });
        if (!user) {
            res.json('Invalid User');
        }
        if (user.balance < amount) {
            res.json('can not join this room');
        }
        else {
            const url = baseRoomUrl + '#' + amount + name + randomIntFromInterval(min, max);
            let data
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
                }
            }
            res.json(data);
        }
    }
    catch (error) {
        res.json(error);
    }
}

const leaveRoom = async (req, res) => {
    const name = req.body.name;
    const amount = req.body.amount;
    console.log('leaving room: ', name)
    if (amount == PRICE1) {
        if (flag1 == false && player1 == name)
            flag1 = true
    }
    else if (amount == PRICE2) {
        if (flag2 == false && player2 == name)
            flag2 = true
    }
    else {
        if (flag3 == false && player3 == name)
            flag3 = true
    }
    res.json('success');
}

module.exports = {
    loadData,
    joinRoom,
    leaveRoom,
}

