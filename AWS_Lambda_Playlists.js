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
          body = await dynamo.scan({ TableName: "Playlists" }).promise();
          break;
        }
        else {
          body = await dynamo.get({TableName: "Playlists", Item: {"name":event.name, "owner":event.owner}}).promise();  
        }
      case "PUT":
        body = await dynamo.put({TableName: "Playlists", Item: {"name":event.name, "owner":event.owner}}).promise();
      default:
        throw new Error(`Unsupported route: "${event.httpMethod}"`);
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


