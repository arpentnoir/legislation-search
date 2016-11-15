var expect = require('chai').expect;
var request = require('superagent')

describe('Consolidated Legislation Search', function() {
	var baseUrl = 'https://warm-wildwood-45332.herokuapp.com'
  describe('when requested at /legislation', function() {
    it('should valid json', function(done) {
      request.get(baseUrl + '/legislation').end(function assert(err, res){
      	expect(err).to.not.be.ok;
      	expect(res).to.have.property('status', 200);
      	expect(res).to.be.json;
      	done();
      })

    });
  });
});