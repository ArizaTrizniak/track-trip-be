import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;