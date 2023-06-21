/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const { API_ELEMS } = process.env;


const agent = session(app);

const createDogTest = {
    name: 'createDogTest',
    image: 'https://tractive.com/blog/wp-content/uploads/2017/08/how-smart-is-my-dog-400x300.jpg',
    height: '25 - 30',
    weight: '6 - 10',
    life_span: '12 - 14 years',
};

const postDogTest = {
    ...createDogTest,
    name: 'Henry Dog',
    image: 'https://m.media-amazon.com/images/I/61JNFVu5U+L._AC_UF1000,1000_QL80_.jpg',
    temperaments: ['Loyal', 'Intelligent', 'Courageous', 'Alert', 'Confident', 'Watchful', 'Fearless', 'Aggressive', 'Obedient', 'Dominant'],
};


describe('GET Dogs routes', () => {

    before(() => conn.authenticate()
        .then(() => conn.sync({ force: true })).then(() => Dog.create(createDogTest))
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }),
    );

    describe('GET /dogs', () => {

        it('should get 200', () =>
            agent.get('/dogs').expect(200),
        );
        it(`should get an array with length >= ${API_ELEMS}`, () =>
            agent.get('/dogs').then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.above(API_ELEMS - 1);
            })
        );
    });

    describe('GET /dogs?name=...', () => {
        it('should get 200', () =>
            agent.get('/dogs?name=Affenpinscher').expect(200),
        );
        it('should get an array with length 1', () =>
            agent.get('/dogs?name=Affenpinscher').then((res) => {
                expect(res.body).to.be.an('array');
                // console.log(res.body)
                expect(res.body).to.have.lengthOf(1);
            })
        );
    });

    describe('GET /dogs/:id', () => {
        it('should get 200', () =>
            agent.get('/dogs/1').expect(200),
        );
        it('should get an object with the correct properties', () =>
            agent.get('/dogs/1').then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('image');
                expect(res.body).to.have.property('height');
                expect(res.body).to.have.property('weight');
                expect(res.body).to.have.property('life_span');
            })
        );
    });
});


describe('POST Dogs routes', () => {

    before(() => conn.authenticate()
        .then(() => conn.sync({ force: true }))
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }),
    );

    describe('POST /dogs', () => {
        it('should get 201 and return the created dog', () =>
            agent.post('/dogs').send(postDogTest).expect(201)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('image');
                    expect(res.body).to.have.property('height');
                    expect(res.body).to.have.property('weight');
                    expect(res.body).to.have.property('life_span');
                })
        );
    });
});


describe('GET Temperaments routes', () => {

    before(() => conn.authenticate()
        .then(() => conn.sync({ force: true }))
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }),
    );

    describe('GET /temperaments', () => {
        it('should get 200', () =>
            agent.get('/temperaments').expect(200),
        );
        it('should get an array with length >= 1', () =>
            agent.get('/temperaments').then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.above(0);
            })
        );
    });

});
