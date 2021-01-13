const dynamodb = require("aws-sdk/clients/dynamodb");
const DB = new dynamodb.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.create = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);

  const { owner_id, owner_name, name, price } = body;

  var params = {
    TableName: tableName,
    Item: { owner_id, owner_name, name, price },
  };

  const result = await DB.put(params).promise();
  console.log(`Database query result ${result}`);

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};

// update book by id
exports.update = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);

  const { id, owner_id, owner_name, name, price } = body;

  var params = {
    TableName: TABLE_NAME,
    Key: { id },
    ExpressionAttributeValues: {
      ":owner_id": owner_id,
      ":owner_name": owner_name,
      ":owner_name": owner_name,
      ":name": name,
      ":price": price,
    },
  };

  DB.update(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
  console.log(`Database query result ${result}`);

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};

exports.index = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getAllItems only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  console.info("received:", event);

  const params = {
    TableName: tableName,
  };
  const data = await DB.scan(params).promise();
  const items = data.Items;

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};

exports.show = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getMethod only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  console.info("received:", event);

  const { id } = event.pathParameters;

  var params = {
    TableName: tableName,
    Key: { id },
  };

  const data = await DB.get(params).promise();
  const item = data.Item;

  const response = {
    statusCode: 200,
    body: JSON.stringify(item),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};

exports.remove = async (event) => {
  if (event.httpMethod !== "DELETE") {
    const message = `getMethod only accept GET method, you tried: ${event.httpMethod}`;
    throw new Error(message);
  }
  console.info("received:", event);

  const { id } = event.pathParameters;

  const params = {
    TableName: tableName,
    Key: { id },
  };
  const result = DB.deleteItem(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(item),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
