const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require('../models')

let getId;

test('POST /movies should create new Movie', async () => {
    const newMovie = {
        name: 'war horse',
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTs0eGAgYZdritx4BRTOAbZy59-Nd6v4HitTJ3Tpo7P9UXm2Luc',
        synopsis: `Young Albert enlists to serve in World War I after his beloved horse is sold to the cavalry. Albert's hopeful journey takes him out of England and to the front lines as the war rages on.`,
        releaseYear: '2002',
    }
    const res = await request(app).post('/movies').send(newMovie);
    getId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
});

test('GET /movies should return all movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /movies should update a Movie', async () => {
    const body = {
        name: 'War Horse',
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTs0eGAgYZdritx4BRTOAbZy59-Nd6v4HitTJ3Tpo7P9UXm2Luc',
        synopsis: `Young Albert enlists to serve in World War I after his beloved horse is sold to the cavalry. Albert's hopeful journey takes him out of England and to the front lines as the war rages on.`,
        releaseYear: '2002',
    }
    const res = await request(app).put(`/movies/${getId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('POST /movies:id/genres should create a new genre in movies', async () => {
    const newGenre = {
        name: 'dream'
    }
    const genre = await Genre.create(newGenre)
    const res = await request(app).post(`/movies/${getId}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies:id/actors should set actors in movies', async () => {
    const actors = await Actor.create({
        firstName: "Jeremy",
        lastName: "Irvine",
        nationality: "Britanic",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Jeremy_Irvine_2011.jpg/250px-Jeremy_Irvine_2011.jpg",
        birthday: "1990-06-17"
    })
    const res = await request(app)
        .post(`/movies/${getId}/actors`)
        .send([actors.id]);
    await actors.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies:id/directors should set directors in movies', async () => {
    const director = await Director.create({
        firstName: "Steven",
        lastName: "Spielberg",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Steven_Spielberg_by_Gage_Skidmore.jpg/270px-Steven_Spielberg_by_Gage_Skidmore.jpg",
        birthday: "1946-12-18"
    })
    const res = await request(app)
        .post(`/movies/${getId}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});



test('DELETE /movies should create new Movie', async () => {
    const res = await request(app).delete(`/movies/${getId}`)
    expect(res.status).toBe(204)
});