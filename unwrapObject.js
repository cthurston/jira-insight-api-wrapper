var _ = require('lodash');
var camelize = require('underscore.string').camelcase;

var unwrapNestedObject = require('./unwrapNestedObject');
var avatarSize = require('./config').avatar.size;

module.exports = unwrapObject;

function unwrapObject(insightObject, objectTypeAttributes) {
	if (!isValidInsightObject(insightObject)) {
		return null;
	}

	var uwObject = {
		id: insightObject.id,
		name: insightObject.name,
		objectKey: insightObject.objectKey,
		created: insightObject.created,
		updated: insightObject.updated,
		hasAvatar: insightObject.hasAvatar,
		timestamp: insightObject.timestamp,
		avatar: {},
		objectType: {}
	};

	uwObject.avatar[avatarSize] = insightObject.avatar[avatarSize];

	uwObject.objectType.id = insightObject.objectType.id;
	uwObject.objectType.name = insightObject.objectType.name;
	uwObject.objectType.description = insightObject.objectType.description;

	_.each(insightObject.attributes, function(attr, index) {

		var objectTypeAttribute = attr.objectTypeAttribute;
		if(!objectTypeAttribute && objectTypeAttributes){
			objectTypeAttribute = objectTypeAttributes[index];
		}

		var attrKey = camelize(objectTypeAttribute.name, true);

		if (objectTypeAttribute.referenceObjectTypeId) {  //Is this a nested object?
			uwObject[attrKey] = unwrapNestedObject(attr, objectTypeAttribute);
		} else if (objectTypeAttribute.maximumCardinality === 1 && attr.objectAttributeValues.length) {  //Is this a single value with a value?
			uwObject[attrKey] = attr.objectAttributeValues[0].value;
		} else if (objectTypeAttribute.maximumCardinality === 1) {  //Is this a single value OUT with a value?
			uwObject[attrKey] = null;
		} else {  //This is array of values
			uwObject[attrKey] = _.map(attr.objectAttributeValues, function(v) {
				return v.value;
			});
		}

	});

	return uwObject;
}

function isValidInsightObject(insightObject) {
	return true;
}