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
    temperaments: ["Loyal", "Intelligent", "Courageous", "Alert", "Confident", "Watchful", "Fearless", "Aggressive", "Obedient", "Dominant"],
};

const putDogTest = {
    ...createDogTest,
    name: 'Put Dog Test',
    image: 'https://i.redd.it/h55w432gc9x41.jpg',
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

    // describe('POST /dogs', () => {
    //     it('should create a dog in the database and this must have got ' +
    //         'the correct temperaments associated', () => {
    //             agent.post('/dogs').send(postDogTest).expect(201)
    //                 .then((res) => {
    //                     expect(res.body).to.be.an('object');
    //                     expect(res.body).to.have.property('name');
    //                     expect(res.body).to.have.property('image');
    //                     expect(res.body).to.have.property('height');
    //                     expect(res.body).to.have.property('weight');
    //                     expect(res.body).to.have.property('life_span');
    //                     expect(res.body).to.have.property('temperaments');
    //                     expect(res.body.temperaments).to.be.an('array');
    //                     expect(res.body.temperaments).to.have.lengthOf(postDogTest.temperaments.length);
    //                     expect(res.body.temperaments).to.have.members(postDogTest.temperaments);
    //                 });
    //         });
    // });
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


describe('PUT Dogs routes', () => {

    let dbId;

    before(() => conn.authenticate()
        .then(() => conn.sync({ force: true })).then(() => Dog.create(createDogTest)).then((dog) => {
            dbId = dog.id;
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        })
    );

    describe('PUT /dogs/:id', () => {
        it('should get 200', () => {
            agent.put(`/dogs/${dbId}`).send(putDogTest).expect(200);
        });
        it('should get an object with the correct properties', () =>
            agent.put(`/dogs/${dbId}`).send(putDogTest).then((res) => {
                expect(res.body.name).to.be.equal(putDogTest.name);
                expect(res.body.image).to.be.equal(putDogTest.image);
                expect(res.body.height).to.be.equal(putDogTest.height);
                expect(res.body.weight).to.be.equal(putDogTest.weight);
                expect(res.body.life_span).to.be.equal(putDogTest.life_span);
            }
            ));
    });

});


describe('DELETE Dogs routes', () => {

    let dbId;

    before(() => conn.authenticate()
        .then(() => conn.sync({ force: true })).then(() => Dog.create(createDogTest)).then((dog) => {
            dbId = dog.id;
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        })
    );

    describe('DELETE /dogs/:id', () => {

        it('should get 200 and have the correct properties', () =>
            agent.delete(`/dogs/${dbId}`).expect(200)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.be.equal(createDogTest.name);
                    expect(res.body.image).to.be.equal(createDogTest.image);
                    expect(res.body.height).to.be.equal(createDogTest.height);
                    expect(res.body.weight).to.be.equal(createDogTest.weight);
                    expect(res.body.life_span).to.be.equal(createDogTest.life_span);
                }),
        );

        it('should get 404', () =>
            agent.delete(`/dogs/${dbId}`).expect(404)
        );

        it('should be deleted from the database', () =>
            Dog.findByPk(dbId).then((dog) => {
                expect(dog).to.be.equal(null);
            })
        );

    });

});
