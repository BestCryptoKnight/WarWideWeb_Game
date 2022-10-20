const Image = require("../../models/Image");
const baseUrl = 'https://drive.google.com/drive/folders/1l3YgdWuyB-V7mC-SLBut5lpcZZ52KLOj';

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const loadData = async (req, res) => {
    const randomNumber = randomIntFromInterval(1, 200);
    console.log('random: ', randomNumber);
    const item = await Image.findOne({ ID: randomNumber });
    const url = baseUrl + '/' + item.ID.toString();
    const data = {
        url: url,
        description: item.Description,
        price: item.Price
    }
    res.json(data);
}

module.exports = {
    loadData,
}