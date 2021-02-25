import {getAdminWelcome} from "../../src/services/admin.service"
import * as chai from 'chai'    
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const expect = chai.expect

describe('Admin Service -> getAdminWelcome', () => {
    it('should get a welcome message when called', async() => {
        return expect(getAdminWelcome()).to.eventually.equal('Hello Admin!')
    })
  })