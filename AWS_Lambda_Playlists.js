const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json", "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE"
  };

  try {
    if (event.path == "/items"){
      switch (event.httpMethod) {
        case "GET":
            body = await dynamo.get({ TableName: "Playlists", Key: {"name": event.queryStringParameters.name, "owner":event.queryStringParameters.owner}}).promise();
          break;
        case "PUT":
          body = await dynamo.put({ TableName: "Playlists", Item: JSON.parse(event.body)}).promise();
          break;
        case "DELETE":
          body = await dynamo.delete({ TableName: "Playlists", Key: JSON.parse(event.body)}).promise();
          break;
        default:
          throw new Error(`Error: "route:${event.httpMethod}, body:${event.body}"`);
      }
    }
    if (event.path == "/all"){
      switch (event.httpMethod) {
        case "GET":
          body = await dynamo.query({ TableName : "Playlists", IndexName: "owner", KeyConditionExpression: "#own = :a", ExpressionAttributeNames: {"#own":"owner"}, ExpressionAttributeValues: {
        ":a": event.body} }).promise();
          break;
        default:
          throw new Error(`Error: "route:${event.httpMethod}, body:${event.body}"`);
      }
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

