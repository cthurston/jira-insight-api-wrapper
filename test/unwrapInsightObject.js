var expect = require('chai').expect;
var unwrap = require('../unwrapObject');

var nestedObject = require('./mock/insightObject');
var unwrappedObject = require('./mock/unwrappedInsightObject');

describe('Insight', function() {
	describe('unwrapObject()', function() {

		it('should unwrap a single product nested in another insight object', function() {
			var unwrapped = unwrap(nestedObject);

			expect(unwrapped).to.eql(unwrappedObject);
		});

	});
});