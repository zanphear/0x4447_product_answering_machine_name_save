let AWS = require('aws-sdk');

//
//  Create the DynamoDB object
//
let ddb = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION
});

//
//  This lambda saves the name that the user over the phone said.
//
exports.handler = (event) => {

    return new Promise(function(resolve, reject) {

        //
        //  1.  Simplify the variable that we need.
        //
        let name = event.Details.ContactData.Attributes.first_name
        let phone_nr = event.Details.ContactData.CustomerEndpoint.Address

        //
        //  2.  Prepare the query
        //
        let params = {
            TableName: "0x4447_connect_sessions",
            Item: {
                id: phone_nr,
                type: 'basic',
                name: name,
                timestamp_created: Math.floor(Date.now() / 1000)
            },
        };

        //
        //  3.  Execute the query
        //
        ddb.put(params, function(error, data) {

            //
            //  1.  Check if there were any errors
            //
            if(error)
            {
                console.info(params);
                return reject(error);
            }

            //
            //  ->  Tell Lambda that we are done working.
            //
            return resolve({});

        });

    });
};