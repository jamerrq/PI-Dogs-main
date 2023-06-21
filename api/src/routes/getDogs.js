const express = require('express');
const router = express.Router();
const { getAllDogs } = require('../controllers/loadAllInfo');


// GET /dogs:
// Obtener un arreglo de objetos, donde cada objeto
// represente la raza de un perro
router.get('/', async (req, res) => {
    // console.log('Ruta /dogs');
    try {
        const dogs = await getAllDogs();
        // Es momento de filtrar por name si es que se envió el query param
        const { name } = req.query;
        if (name) {
            const dogsFiltered = dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            if (dogsFiltered.length === 0)
                return res.status(404).json({ error: 'Dogs not found' });
            return res.status(200).json(dogsFiltered);
        };
        return res.status(200).json(dogs);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    };
});


// GET /dogs/:idRaza
// Esta ruta obtiene el detalle de una raza de perro en particular
// Devuelve un objeto con la información pedida en el detalle de un perro
// La raza es recibida por parámetro
// Tiene que incluir los datos de los temperamentos asociados a la raza
// Debe funcionar tanto para los perros de la API como los de la base de datos
router.get('/:idRaza', async (req, res) => {
    // console.log('req.params', req.params);
    const { idRaza } = req.params;
    if (!idRaza) return res.status(400).json({ error: 'Bad request' });
    try {
        // Traigo todos los perros de la API y de la DB
        const dogs = await getAllDogs();
        // Busco el perro con el idRaza que me pasaron, puede coincidir
        // con idApi o id
        const dogFound = dogs.find(dog => String(dog.id) === idRaza ||
            String(dog.idApi) === idRaza);
        if (!dogFound) return res.status(404).json({ error: 'Dog not found' });
        // Si lo encontré, lo devuelvo
        return res.status(200).json(dogFound);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    };
});


module.exports = router;
