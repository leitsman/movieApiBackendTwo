const request = require("supertest");
const app = require("../app");

let getId;

test('POST /directors should create a new ', async () => {
    const newDirector = {
        firstName: "steven",
        lastName: "Spielberg",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Steven_Spielberg_by_Gage_Skidmore.jpg/270px-Steven_Spielberg_by_Gage_Skidmore.jpg",
        birthday: "1946-12-18"
    }
    const res = await request(app).post(`/directors`).send(newDirector)
    getId = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(newDirector.firstName)
});
test('GET /directors should return all the actors', async () => {
    const res = await request(app).get(`/directors`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test('PUT /directors should delete a actor', async () => {
    const body = {
        firstName: "Steven",
        lastName: "Spielberg",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Steven_Spielberg_by_Gage_Skidmore.jpg/270px-Steven_Spielberg_by_Gage_Skidmore.jpg",
        birthday: "1946-12-18"
    }
    const res = await request(app).put(`/directors/${getId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE /directors should delete a actor', async () => {
    const res = await request(app).delete(`/directors/${getId}`)
    expect(res.status).toBe(204)
});