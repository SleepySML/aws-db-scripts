var AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
  region: "eu-west-1", // Update this with the region you are using
});

var dynamodb = new AWS.DynamoDB.DocumentClient();

var products = [{
    id: uuidv4(),
    title: 'Product 1',
    description: 'This is product 1',
    price: 1000
}, {
    id: uuidv4(),
    title: 'Product 2',
    description: 'This is product 2',
    price: 2000
}];

var stock = [{
    product_id: products[0].id,
    count: 10
}, {
    product_id: products[1].id,
    count: 20
}];

products.forEach((product) => {
    var params = {
        TableName: 'products',
        Item: product
    };

    dynamodb.put(params, function(err, data) {
        if (err) console.error("Unable to add product", product.title, ". Error JSON:", JSON.stringify(err, null, 2));
        else console.log("PutItem succeeded:", product.title);
    });
});

stock.forEach((stockItem) => {
    var params = {
        TableName: 'stocks',
        Item: stockItem
    };

    dynamodb.put(params, function(err, data) {
        if (err) console.error("Unable to add stock", stockItem.product_id, ". Error JSON:", JSON.stringify(err, null, 2));
        else console.log("PutItem succeeded:", stockItem.product_id);
    });
});