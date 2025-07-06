const express = require('express');
const router = express.Router();

/* GET users listing. */

router.get('/', (req, res) => {
  res.send('This is About page')
})

module.exports = router;
