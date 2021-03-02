import supertest from 'supertest'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import { app } from '../../src/index'

chai.use(sinonChai)
export const { expect } = chai
export const server = supertest.agent(app)

describe('get coin info test', () => {
  it('should get coins list', (done) => {
    server
      .get(`/coins/bitcoin`)
      .send({})
      .end((err, res) => {
        expect(res.body).to.be.a('Object')
        expect(res.body).to.have.all.keys(
          'id',
          'symbol',
          'currentPrice',
          'image',
          'lastUpdated',
          'name'
        )
        done()
      })
  })

  it('should get 404 error', (done) => {
    server
      .get(`/coins/bitcoinnn`)
      .send({})
      .expect(404)
      .end((err, res) => {
        done()
      })
  })
})
