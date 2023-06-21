const { getAllDogs, getDogsApi, getDogsDb, } = require('../../src/controllers/loadAllInfo');
const { expect } = require('chai');
const { API_ELEMS } = process.env;


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
        it('should return an array', async () => {
            const dogsDb = await getDogsDb();
            expect(dogsDb).to.be.an('array');
        });
    });
    describe('getAllDogs', () => {
        it('should return an array', async () => {
            const allDogs = await getAllDogs();
            expect(allDogs).to.be.an('array');
        });
    });
});
