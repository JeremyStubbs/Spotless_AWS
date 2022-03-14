const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.httpMethod) {
      case "GET":
        if (event.path == "/items"){
          body = await dynamo.get({ TableName: "Playlists", Key: {"name": event.queryStringParameters.name, "owner":event.queryStringParameters.owner}}).promise();
          break;
        }
        
      default:
        throw new Error(`Unsupported route: "${event.queryParameters}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
