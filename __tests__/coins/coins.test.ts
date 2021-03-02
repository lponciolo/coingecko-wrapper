import supertest from 'supertest'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import { app } from '../../src/index'

chai.use(sinonChai)
export const { expect } = chai
export const server = supertest.agent(app)

describe('Index page test', () => {
  it('should get coins list', (done) => {
    server
      .get(`/coins`)
      .send({
        vsCurrency: 'ars',
        perPage: '100',
        page: '1',
      })

      .end((err, res) => {
        expect(res.body).to.be.a('Array')
        expect(res.body[0]).to.have.all.keys(
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
})
