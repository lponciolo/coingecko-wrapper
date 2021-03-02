import supertest from 'supertest'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import { app } from '../src/index'

chai.use(sinonChai)
export const { expect } = chai
export const server = supertest.agent(app)
let accessToken = ''
let refreshToken = ''
const wrongToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2Q4NzdlY2QxN2I1MDAyMDdlODFjZCIsInVzZXJuYW1lIjoianVhbmNpdG8iLCJwcmVmZXJyZRWDdXJyZW5jeSI6InVzZCIsImV4cCI6MTYxNDY1MTEzMC44OTYsImlhdCI6MTYxNDY0NTEzMH0.7lRXqqsrUzY-9R-OIumbxKxRals3C1-sJUGAamjet2s'
describe('users endpoints integration test', () => {
  it('should get login information', (done) => {
    server
      .post(`/login`)
      .send({
        username: 'larrysmith',
        password: 'batmanbestpassword',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.all.keys(
          'message',
          'username',
          'accessToken',
          'refreshToken'
        )
        refreshToken = res.body.refreshToken
        done()
      })
  })

  it('should get a new token', (done) => {
    server
      .post(`/token`)
      .send({
        username: 'larrysmith',
        refreshToken: refreshToken,
      })
      .expect(200)
      .end((err, res) => {
        console.log(res.body)
        refreshToken = res.body.refreshToken
        accessToken = res.body.accessToken
        done()
      })
  })

  it('should add a new coin', (done) => {
    server
      .post(`/users/me/coins`)
      .auth(accessToken, { type: 'bearer' })
      .send({
        name: 'bitcoin',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)

        refreshToken = res.body.refreshToken
        done()
      })
  })

  it('should reject unauthorized user', (done) => {
    server
      .post(`/users/me/coins`)
      .auth(wrongToken, { type: 'bearer' })
      .send({
        name: 'bitcoin',
      })
      .end((err, res) => {
        expect(res.status).to.equal(401)

        refreshToken = res.body.refreshToken
        done()
      })
  })

  it('should get 404 error if coin name is wrong', (done) => {
    server
      .post(`/users/me/coins`)
      .auth(accessToken, { type: 'bearer' })
      .send({
        name: 'bitcoinnnnn',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404)
        refreshToken = res.body.refreshToken
        done()
      })
  })

  it('should get user coins list', (done) => {
    server
      .get(`/users/me/coins`)
      .auth(accessToken, { type: 'bearer' })
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.coins).to.be.a('Array')

        refreshToken = res.body.refreshToken
        done()
      })
  })

  it('should get user coins with actualPrice in preferred currency option', (done) => {
    server
      .get(`/users/me/coins/compare`)
      .auth(accessToken, { type: 'bearer' })
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.coins).to.be.a('Array')
        console.log(res.body.coins[0])
        refreshToken = res.body.refreshToken
        done()
      })
  })
})
