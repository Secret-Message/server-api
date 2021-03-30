// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const express = require('express');
const router = express.Router();

router.delete('/message', (req, res) => {
    const id = req.params.id;
    const { token } = req.body;
});
router.get('/message', (req, res) => {
    const id = req.params.id;
    const { filter, token } = req.body;
});

router.post('/message', (req, res) => {
    const id = req.params.id;
    const { token, content, response } = req.body; // tp macie jakiś pomysł jak zaimplementować to jwt?
});

// ja nie będę mógł gadać przez następne 30 minut (może z małymi wyjątkami się odezwę)
// to wy piszcie (jeśli chcecie) - chcemy xD
// to trzeba wymyśleć jak mamy zaimplementować to jwt
// można zrobić, że jwt jest zamiast uid oraz tokenu w requestach
// tak xD

router.put('/message', (req, res) => {
    const id = req.params.id;
    const { token, content } = req.body;
});

module.exports = router;