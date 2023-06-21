const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDog = require('./getDogs');
const postDog = require('./postDogs');
const getTemperaments = require('./getTemperaments');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const router = Router();
router.use('/dogs', getDog);
router.use('/dogs', postDog);
router.use('/temperaments', getTemperaments);


module.exports = router;
