const axios = require('axios');
require('dotenv').config();
const { API_KEY, API_ENV } = process.env;
const { Dog, Temperament } = require('../db.js');


let dogsApi = [];
let dogsDb = [];
let temperaments = [];
let apiInfoLoaded = false;
// let dbInfoLoaded = false;


const testingDog = {
    name: 'DRACULA BOY',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Thierry_Henry_%2851649035951%29_%28cropped%29.jpg',
    height: '25 - 30',
    weight: '6 - 10',
    life_span: '12 - 14 years',
};


const getDogsApi = async () => {

    if (apiInfoLoaded) return dogsApi;
    try {
        const baseURL = 'https://api.thedogapi.com/v1/breeds?api_key';
        const response = await axios.get(`${baseURL}=${API_KEY}`);
        dogsApi = response.data.map(dog => {
            let dogTemperaments = dog.temperament ? dog.temperament.split(', ') : [];
            dogTemperaments.forEach(temperament => {
                if (!temperaments.includes(temperament)) temperaments.push(temperament);
            });
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                temperament: dog.temperament,
                weight: dog.weight.metric,
                height: dog.height.metric,
                life_span: dog.life_span
            }
        });
        apiInfoLoaded = true;
        return dogsApi;
    } catch (error) {
        console.log('Error in getDogsApi()');
        console.log(error);
        return [];
    };

};


const getDogsDb = async () => {

    // if (dbInfoLoaded) return dogsDb;
    try {
        dogsDb = await Dog.findAll({
            include: [
                {
                    model: Temperament,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        // console.log('dogsDb', dogsDb);
        dbInfoLoaded = true;
        return dogsDb;
    } catch (error) {
        console.log('Error in getDogsDb()');
        console.log(error);
        return [];
    };

};


const getAllDogs = async () => {

    try {
        // console.log('ENVIRONMENT:', API_ENV);
        if (API_ENV === 'testing') {
            console.log('TESTING ENVIRONMENT');
            await Dog.create(testingDog);
            console.log('TESTING DOG CREATED');
        };
        const dogsApi = await getDogsApi();
        const dogsDb = await getDogsDb();
        // console.log('dogsApi', dogsApi);
        // console.log('DOGS IN DB:', dogsDb.length);
        // console.log(typeof dogsDb[0], Object.keys(dogsDb[0]));
        const dogsFromDb = dogsDb.map(dog => {

            let dogTemperaments = dog.temperaments.map(temperament => temperament.name);
            dogTemperaments.forEach(temperament => {
                if (!temperaments.includes(temperament)) temperaments.push(temperament);
            });
            // console.log('dogTemperaments', dogTemperaments);
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image,
                temperament: dogTemperaments.join(', '),
                weight: dog.weight,
                height: dog.height,
                life_span: dog.life_span
            };

        });
        const allDogs = dogsFromDb.concat(dogsApi);
        // console.log('ALL DOGS:', allDogs.length);
        return allDogs;
    } catch (error) {
        console.log('Error in getAllDogs()');
        console.log(error);
        return [];
    };

};


module.exports = {
    getAllDogs,
    getDogsApi,
    getDogsDb,
    temperaments
};
