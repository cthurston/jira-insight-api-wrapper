var expect = require('chai').expect;
var unwrapNestedProduct = require('../unwrapNestedObject');

var nestedObjects = require('./mock/nestedInsightObjects');
var unwrappedNestedObjects = require('./mock/unwrappedNestedInsightObjects');

describe('Insight', function() {
	describe('unwrapNestedObject()', function() {

		it('should unwrap a single product nested in another insight object', function() {
			var unwrappedSingle = unwrapNestedProduct(nestedObjects.single);

			expect(unwrappedSingle).to.eql(unwrappedNestedObjects.single);
		});

		it('should unwrap a multiple product nested in another insight object', function() {
			var unwrappedSingle = unwrapNestedProduct(nestedObjects.multiple);

			expect(unwrappedSingle).to.eql(unwrappedNestedObjects.multiple);
		});

	});
});