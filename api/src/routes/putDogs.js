const express = require('express');
const router = express.Router();
const { Dog } = require('../db.js');


// PUT /dogs/:id
// Esta ruta recibirá los datos necesarios para modificar un perro existente
// No se podrán modificar el ID ni los temperamentos
// Toda la información debe ser recibida por body
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, height, weight, life_span, image } = req.body;
    // console.log('Ruta PUT /dogs/:id');
    // console.log(req.body);

    // Se tiene que recibir al menos un campo para modificar
    if (!name && !height && !weight && !life_span && !image) {
        return res.status(400).json({ error: 'Missing required fields' });
    };

    try {
        // Buscamos el perro por ID
        const dog = await Dog.findByPk(id);
        if (!dog) return res.status(404).json({ error: 'Dog not found' });
        // Actualizamos los campos recibidos
        if (name) dog.name = name;
        if (height) dog.height = height;
        if (weight) dog.weight = weight;
        if (life_span) dog.life_span = life_span;
        if (image) dog.image = image;
        // Guardamos los cambios
        await dog.save();
        return res.status(200).json(dog);
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
