const axios = require('axios');
const { API_KEY } = process.env;
const { Dog } = require('../db.js');


let dogsApi = [];
let dogsDb = [];
let temperaments = [];
let apiInfoLoaded = false;
let dbInfoLoaded = false;


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
                // temperament: dog.temperament,
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
    if (dbInfoLoaded) return dogsDb;
    try {
        dogsDb = await Dog.findAll();
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
        const dogsApi = await getDogsApi();
        const dogsDb = await getDogsDb();
        const allDogs = dogsApi.concat(dogsDb);
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
