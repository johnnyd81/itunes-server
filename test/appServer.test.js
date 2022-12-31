let expect = require('chai').expect
let request = require('request')
//this test checks that my app.get route to the iTunes api functions correctly

describe('Status', function () {
  describe('search', function () {
    it('status', function (done) {
      request('http://localhost:8080/search/:term/:type', function (
        error,
        response,
        body,
      ) {
        expect(response.statusCode).to.equal(200)
        done()
      })
    })
  })
})
