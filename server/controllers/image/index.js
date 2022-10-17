const Image = require("../../models/Image");

// Display All Image Data
const image_index = (req, res) => {
    Image.find(function (err, images) {
        res.json(images);
    });
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
    image_index,
    image_details,
    image_create_post,
    image_update,
    image_delete,
};