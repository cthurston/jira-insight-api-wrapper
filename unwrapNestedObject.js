var _ = require('lodash');

var avatarSize = require('./config').avatar.size;

module.exports = function(nestedInsightObject, objectTypeAttribute) {
	if(!nestedInsightObject.objectTypeAttribute){
		nestedInsightObject.objectTypeAttribute = objectTypeAttribute; //Mutates original.
	}

	if (!isValidInsightObject(nestedInsightObject)) {
		return null;
	}

	var nestedObjects = _.map(nestedInsightObject.objectAttributeValues, extractObject, null);

	if (isArrayOfObjects(nestedInsightObject)) {
		return nestedObjects;
	} else {
		return nestedObjects[0];
	}

};

function extractObject(insightValue) {
	var ref = insightValue.referencedObject;
	var obj = {
		id: ref.id,
		name: ref.name,
		objectKey: ref.objectKey,
		avatar: {},
		objectType: {
			name: ref.objectType.name
		}
	};

	obj.avatar[avatarSize] = ref.avatar[avatarSize];

	return obj;
}

function isValidInsightObject(insightObject) {
	if (insightObject.objectTypeAttribute &&
			insightObject.objectTypeAttribute.referenceObjectType) {
		return true;
	}
}

function isArrayOfObjects(insightObject) {
	return insightObject.objectTypeAttribute.maximumCardinality !== 1;
}