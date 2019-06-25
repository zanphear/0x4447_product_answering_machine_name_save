let AWS = require('aws-sdk');

//
//	Create the DynamoDB object
//
let dynamodb = new AWS.DynamoDB({
	apiVersion: '2012-08-10',
	region: 'us-east-1'
});

exports.handler = (event, context, callback) => {

    console.log(JSON.stringify(event, null, 4))

    let name = event.Details.ContactData.Attributes.first_name
    let phone_nr = event.Details.ContactData.CustomerEndpoint.Address

    //
	//	1.	Prepare the query
	//
	let params = {
		Item: {
			phone_nr: {
				S: phone_nr
			},
			name: {
				S: name
			}
		},
		TableName: "0x4447_connect_sessions"
	};

	//
	//	2.	Execute the query
	//
	dynamodb.putItem(params, function(error, data) {

		//
		//	1.	Check if there were any errors
		//
		if(error)
		{
			console.log(error);
		}

        //
        //  ->  Tell Lmabda that we are done working
        //
        callback(null, {});

	});


};