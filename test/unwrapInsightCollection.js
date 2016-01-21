var expect = require('chai').expect;
var unwrap = require('../unwrapCollection');

var collectionWithAttributes = require('./mock/insightCollection').withAttributes;
var collectionWithoutAttributes = require('./mock/insightCollection').withoutAttributes;

var unwrappedCollectionWithAttr = require('./mock/unwrappedInsightCollection').withAttributes;
var unwrappedCollectionWithoutAttr = require('./mock/unwrappedInsightCollection').withoutAttributes;


describe('Insight unwrapCollection()', function() {

	it('should unwrap a collection of object with attributes', function() {
		var unwrapped = unwrap(collectionWithAttributes);
		expect(unwrapped).to.eql(unwrappedCollectionWithAttr);
	});

	it('should unwrap a collection of object without attributes', function() {
		var unwrapped = unwrap(collectionWithoutAttributes);
		expect(unwrapped).to.eql(unwrappedCollectionWithoutAttr);
	});

});