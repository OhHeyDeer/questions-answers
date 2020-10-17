const { client } = require('./clientGeneration');

// Connect to the database
client.connect();


// GET all the Product Questions List
client.query("SELECT * FROM products INNER JOIN questions ON (products.id === questions.product_id) ")

// execute a basic query
// client.query("INSERT INTO products(name) VALUES ($1)", ['John Doe'], (err, res) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(res);
//     }
//     client.end();
// });

// client.query("DELETE FROM products WHERE id = $1", [5], (err, res) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(res);
//     }
//     client.end();
// })


