const { getAllDogs, getDogsApi, getDogsDb, } = require('../../src/controllers/loadAllInfo');
const { expect } = require('chai');
const { API_ELEMS } = process.env;
const { Dog } = require('../../src/db.js');


describe('Dogs controllers', () => {

    before(() => {
        getAllDogs();
    });

    describe('getDogsApi', () => {
        it('should return an array', async () => {
            const dogsApi = await getDogsApi();
            expect(dogsApi).to.be.an('array');
        });
        it(`should return an array with length ${API_ELEMS}`, async () => {
            const dogsApi = await getDogsApi();
            expect(dogsApi).to.have.lengthOf(API_ELEMS);
        });
    });

    describe('getDogsDb', () => {
        it('should return an array with the same number of elements in the database', async () => {
            const dogsDb = await getDogsDb();
            expect(dogsDb).to.be.an('array');
            let dbElems = await Dog.count();
            expect(dogsDb).to.have.lengthOf(dbElems);
        });
    });

    describe('getAllDogs', () => {
        it('should return an array with the same number of elements in the database plus the number of elements in the API', async () => {
            const dogs = await getAllDogs();
            expect(dogs).to.be.an('array');
            let dbElems = await Dog.count();
            expect(dogs).to.have.lengthOf(dbElems + API_ELEMS);
        });
    });

});
