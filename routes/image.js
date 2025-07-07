const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/:name', (req, res) => {
    const fileName = req.params.name;

    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(fileName).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
        return res.status(400).send('Invalid file type');
    }

    const filePath = path.join(__dirname, '..', 'public', 'images', fileName);

    res.download(filePath, fileName,(err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    });
});

module.exports = router;