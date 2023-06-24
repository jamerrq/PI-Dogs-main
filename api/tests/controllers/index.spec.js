const { getAllDogs, getDogsApi, getDogsDb, } = require('../../src/controllers/loadAllInfo');
const { expect } = require('chai');
const { API_ELEMS } = process.env;
const { Dog, conn } = require('../../src/db.js');
const { get } = require('../../src/routes');


const dogExample = {
    name: 'Example',
    height: '1 - 2',
    weight: '1 - 2',
    life_span: '1 - 2',
    image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
    temperaments: ['Stubborn', 'Curious', 'Playful', 'Adventurous', 'Active', 'Fun-loving'],
};


describe('Dogs controllers', () => {

    before(() => conn.authenticate()
        .then(() => conn.sync({ force: true })).then(() => {
            Dog.create(dogExample);
            getAllDogs();
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }),
    );

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

    describe('getDogsDb', () => {
        it('should return an array of objects with the correct properties', async () => {
            const dogsDb = await getDogsDb();
            expect(dogsDb).to.be.an('array');
            expect(dogsDb[0]).to.have.property('name');
            expect(dogsDb[0]).to.have.property('height');
            expect(dogsDb[0]).to.have.property('weight');
            expect(dogsDb[0]).to.have.property('life_span');
            expect(dogsDb[0]).to.have.property('image');
            expect(dogsDb[0]).to.have.property('temperaments');
        });
    });

    describe('getAllDogs', () => {
        it('should return an array with the same number of elements in the database plus the number of elements in the API', async () => {
            const dogs = await getAllDogs();
            expect(dogs).to.be.an('array');
            let dbElems = await Dog.count();
            expect(dogs).to.have.lengthOf(parseInt(dbElems)
                + parseInt(API_ELEMS));
        });
    });

});
