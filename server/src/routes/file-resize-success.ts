import express from 'express';

const router = express.Router();

router.post('/api/file-resize-status-update', async (req, res, next) => {
    try {
        const ResizeData = req.body;
        console.log(ResizeData);
        res.status(200).send('');
    } catch (err) {
        res.status(400).send('An error occurred');
    }
})

export {router as FileResizeSuccess};
