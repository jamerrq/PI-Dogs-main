const express = require('express');
const router = express.Router();
const { Dog, Temperament } = require('../db.js');
const { v4: uuidv4 } = require('uuid');


// POST /dogs
// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y
// relacionarlo con un temperamento existente o uno creado al momento
// Toda la información debe ser recibida por body
router.post('/', async (req, res) => {
    const { name, height, weight, life_span, temperaments, image } = req.body;
    // console.log('Ruta POST /dogs');
    // console.log(req.body);
    if (!name || !height || !weight || !life_span || !temperaments || !image)
        return res.status(400).json({ error: 'Missing required fields' });
    try {
        const dog = await Dog.create({
            id: uuidv4(),
            name,
            height,
            weight,
            life_span,
            image
        });
        // Creamos los temperamentos que no existan
        const temperamentsCreated = await Promise.all(temperaments.map(async temperament => {
            const [temperamentCreated] = await Temperament.findOrCreate({
                where: {
                    name: temperament
                }
            });
            return temperamentCreated;
        }));
        // Asociamos los temperamentos al perro
        await dog.addTemperaments(temperamentsCreated);
        return res.status(201).json(dog);
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
