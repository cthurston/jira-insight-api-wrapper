var _ = require('lodash');

var unwrapObject = require('./unwrapObject');

module.exports = unwrapCollection;

function unwrapCollection(insightCollection) {
	if (!isValidInsightObject(insightCollection)) {
		return null;
	}

	var coll = {
		fields: insightCollection.fields,
		filters: insightCollection.filters,
		objectTypeId: insightCollection.objectTypeId,
		orderWay: insightCollection.orderWay,
		pageNumber: insightCollection.pageNumber,
		pageObjectSize: insightCollection.pageObjectSize,
		pageSize: insightCollection.pageSize,
		startIndex: insightCollection.startIndex,
		toIndex: insightCollection.toIndex,
		totalCount: insightCollection.totalCount,
		totalFilterCount: insightCollection.totalFilterCount
	};

	coll.objectEntries = _.map(insightCollection.objectEntries, function(insightObject) {
		return unwrapObject(insightObject, insightCollection.objectTypeAttributes);
	});

	return coll;

}

function isValidInsightObject(insightCollection) {
	if (!_.isArray(insightCollection.objectEntries)) {
		return false;
	}

	if (!_.isArray(insightCollection.objectTypeAttributes)) {
		return false;
	}

	return true;
}