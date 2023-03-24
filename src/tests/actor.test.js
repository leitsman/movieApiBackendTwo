const request = require("supertest");
const app = require("../app");

let getId;

test('POST /actors should create new actor', async () => {
    const newActor = {
        firstName: "Jeremy",
        lastName: "Irvine",
        nationality: "britanic",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Jeremy_Irvine_2011.jpg/250px-Jeremy_Irvine_2011.jpg",
        birthday: "1990-06-17"
    }
    const res = await request(app).post('/actors').send(newActor)
    getId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(newActor.firstName)
});

test('GET /actors should return a actors', async () => {
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test('PUT /actors should update one actor', async () => {
    const body = {
        firstName: "Jeremy",
        lastName: "Irvine",
        nationality: "Britanic",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Jeremy_Irvine_2011.jpg/250px-Jeremy_Irvine_2011.jpg",
        birthday: "1990-06-17"
    }
    const res = await request(app).put(`/actors/${getId}`).send(body)
    expect(res.status).toBe(200)
    expect(res.body.nationality).toBe(body.nationality)
});

test('DELETE /actors should delete a actor', async () => {
    const res = await request(app).delete(`/actors/${getId}`)
    expect(res.status).toBe(204)
});