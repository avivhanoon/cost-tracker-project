const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('User Routes', () => {
    beforeAll(async() => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    it('should return team members', async() => {
        const response = await request(app).get('/api/about');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('first_name');
        expect(response.body[0]).toHaveProperty('last_name');
    });

    afterAll(async() => {
        await mongoose.connection.close();
    });
});