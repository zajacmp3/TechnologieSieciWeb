//Static variables

var andSeparator = " AND ";

exports.jsonToQuery = function(action, model, req) {
	var query;
	
	var queryKeys = [];
	var queryValues = [];
	var queryCondition = [];
	var set = null;
	for(var key in req){
		if(key != 'set') {
			queryKeys.push(key);
			queryValues.push(req[key]);
		} else {
			var obj = req[key];
			if (typeof obj == 'object') {
				set = obj
			} else {
				obj = JSON.parse(obj);
				set = obj;				
			}
		}
    }
	
	switch(action) {
		case 'insert':
			var queryInsertValues = [];
			for(var i = 0; i<queryValues.length; i++) {
				queryInsertValues.push("'" + queryValues[i] + "'");
			}
			query = "INSERT INTO " + model + " (" + queryKeys.join(',')
				+ ") VALUES (" + queryInsertValues.join(',') + ")";
			console.log(query);
			return query;
		case 'select':
			var queryConditions = [];
			for(var i = 0; i < queryKeys.length; i++) {
				queryCondition = [];
				queryCondition.push(queryKeys[i]);
				queryCondition.push("'" + queryValues[i] + "'");
				queryConditions.push(queryCondition.join(' = '));
			}
			query = "SELECT * FROM " + model;
			if(queryConditions.length > 0) {
				 query = query + " WHERE " + queryConditions.join(andSeparator);
			}
			console.log(query);
			return query;
		case 'update':
			var querySetValues = [];
			var querySetKeys = [];
			for(var key in set){
				querySetKeys.push(key);
				querySetValues.push(set[key]);
		    }
			var queryConditions = [];
			for(var i = 0; i < queryKeys.length; i++) {
				queryCondition = [];
				queryCondition.push(queryKeys[i]);
				queryCondition.push("'" + queryValues[i] + "'");
				queryConditions.push(queryCondition.join(' = '));
			}
			var querySetConditions = [];
			for(var i = 0; i < querySetKeys.length; i++) {
				queryCondition = [];
				queryCondition.push(querySetKeys[i]);
				queryCondition.push("'" + querySetValues[i] + "'");
				querySetConditions.push(queryCondition.join(' = '));
			}
			query = "UPDATE " + model + " SET " + querySetConditions.join(', ') + " WHERE " + queryConditions.join(andSeparator);
			console.log(query);
			return query;
		case 'delete':
			var queryConditions = [];
			for(var i = 0; i < queryKeys.length; i++) {
				queryCondition = [];
				queryCondition.push(queryKeys[i]);
				queryCondition.push("'" + queryValues[i] + "'");
				queryConditions.push(queryCondition.join(' = '));
			}
			query = "DELETE FROM " + model + " WHERE " + queryConditions.join(andSeparator);
			console.log(query);
			return query;
	}
};
