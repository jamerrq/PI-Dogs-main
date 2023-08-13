const express = require('express');
const router = express.Router();
const { Dog } = require('../db.js');


// DELETE /dogs/:id
// Esta ruta recibirá solo el ID del perro a eliminar
router.delete('/:id', async (req, res) => {
    // console.log('Ruta DELETE /dogs/:id');
    const { id } = req.params;
    try {
        // Buscamos el perro por ID
        const dog = await Dog.findByPk(id);
        if (!dog) return res.status(404).json({ error: 'Dog not found' });
        // Eliminamos el perro
        await dog.destroy();
        // Enviamos el perro eliminado
        return res.status(200).json(dog);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
});


module.exports = router;
