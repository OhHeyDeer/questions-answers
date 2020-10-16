const { client } = require('./clientGeneration');

// const connectionString = 'postgres://postgres:nickroz80@PostgreSQL\ 13/10.0.0.174:5432/questions-answers';


// Instantiate the client for postgres database
// const client = new Client({
//     host: 'localhost',
//     user: 'postgres',
//     password: 'nickroz80',
//     database: 'questions-answers',
//     port: 5432
// });

// Connect to the database
client.connect();


// GET all the Product Questions List
client.query("SELECT * FROM products INNER JOIN questions ON (products.id === questions.product_id) ")



// execute a basic query
// client.query("INSERT INTO products(name) VALUES ($1)", ['Shmon Doe'], (err, res) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(res);
//     }
//     client.end();
// });

// client.query("DELETE FROM products WHERE name = $1", ['John Doe'], (err, res) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(res);
//     }
//     client.end();
// })


