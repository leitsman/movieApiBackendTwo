const request = require("supertest");
const app = require("../app");
require('../models')

let getId;

test('POST /genres should create new genre', async () => {
    const newGenre = {
        name: 'comedia'
    }
    const res = await request(app).post('/genres').send(newGenre);
    getId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newGenre.name);
});

test('GET /genres should return all genres', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /genres should update a genre', async () => {
    const body = {
        name: 'tragedia'
    }
    const res = await request(app).put(`/genres/${getId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /genres should create new genre', async () => {
    const res = await request(app).delete(`/genres/${getId}`)
    expect(res.status).toBe(204)
});
