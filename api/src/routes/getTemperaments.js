const express = require('express');
const router = express.Router();
const { getAllDogs, temperaments } = require('../controllers/loadAllInfo');


// GET /temperaments:
// Obtener todos los temperamentos posibles
router.get('/', async (req, res) => {
    try {
        await getAllDogs();
        return res.status(200).json(temperaments);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    };
});


module.exports = router;
