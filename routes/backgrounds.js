import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const backgroundsDir = path.join(process.cwd(), 'public', 'backgrounds');

router.get('/', (req, res) => {
    fs.readdir(backgroundsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read backgrounds folder' });
        }
        const imageFiles = files.filter(f => /\.(jpe?g|png|webp|bmp|gif)$/i.test(f));
        res.json(
            imageFiles.map(filename => ({
                id: filename,
                previewUrl: `backgrounds/thumbs/${filename}`,   // если нужны превью
                originalUrl: `backgrounds/${filename}`
            })));
    });
});

export default router;
