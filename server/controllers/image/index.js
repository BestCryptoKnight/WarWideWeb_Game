const Image = require("../../models/Image");
const readExcel = require('read-excel-file/node');
const fs = require('fs');

const read_excel = async (req, res) => {
    //    Image.remove();
    try {
        readExcel(fs.createReadStream('./controllers/image/datas.xlsx'))
            .then((rows) => {
                let sRow = 0;
                let eRow = 0;
                let eCol = 0;
                eCol = rows[0].length;
                eRow = rows.length;

                let colData = [];
                //Create insertion object to send to insertMany API of mongoose
                for (var i = sRow + 1; i < eRow; i++) {
                    var obj = {};
                    for (var j in rows[i]) {
                        obj[rows[sRow][j]] = rows[i][j];
                    }
                    colData.push(obj);
                }
                console.log(colData);

                Image.insertMany(colData)
                    .then((result) =>
                        console.log('success'))
                    .catch((error) =>
                        console.log('failed')
                    );
            });
    } catch (error) {
        console.log(error);
    }
}
read_excel();
// Display All Image Data
const image_index = async (req, res) => {
    try {
        let query = Image.find();

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 4;
        const skip = (page - 1) * pageSize;
        const total = await Image.countDocuments();

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

// Create New Image
const image_create_post = (req, res) => {
    let image = new Image(req.body);
    console.log('image: ', image);
    image
        .save()
        .then((image) => {
            res.send(image);
        })
        .catch(function (err) {
            res.status(422).send(err.message);
        });
};

// Show a particular Image Detail by Id
const image_details = (req, res) => {
    Image.findById(req.params.id, function (err, image) {
        if (!image) {
            res.status(404).send("No result found");
        } else {
            res.json(image);
        }
    });
};

// Update Image Detail by Id
const image_update = (req, res) => {
    Image.findByIdAndUpdate(req.params.id, req.body)
        .then(function () {
            res.json("Image updated");
        })
        .catch(function (err) {
            res.status(422).send("Image update failed.");
        });
};

// Delete Image Detail by Id
const image_delete = (req, res) => {
    Image.findById(req.params.id, function (err, image) {
        if (!image) {
            res.status(404).send("Image not found");
        } else {
            Image.findByIdAndRemove(req.params.id)
                .then(function () {
                    res.status(200).json("Image deleted");
                })
                .catch(function (err) {
                    res.status(400).send("Image delete failed.");
                });
        }
    });
};

module.exports = {
    read_excel,
    image_index,
    image_details,
    image_create_post,
    image_update,
    image_delete,
};