const { client } = require('./clientGeneration');

// Connect to the database
 
// TO SEED THE DB RUN THESE COMMANDS IN THE PSQL SHELL
// \COPY products(name) FROM '/Users/nickwtimms/Desktop/Galvanize_Work/SDC/questions-answers/server/db/data/productData.csv' WITH (FORMAT csv)
// \COPY questions(question_body, question_date, asker_name, question_helpfulness, reported, email, product_id) FROM '/Users/nickwtimms/Desktop/Galvanize_Work/SDC/questions-answers/server/db/data/questionData.csv' WITH (FORMAT csv)
// \COPY answers(body, date, answerer_name, helpfulness, question_id) FROM '/Users/nickwtimms/Desktop/Galvanize_Work/SDC/questions-answers/server/db/data/answersData.csv' WITH (FORMAT csv)
// \COPY photos(url, answer_id) FROM '/Users/nickwtimms/Desktop/Galvanize_Work/SDC/questions-answers/server/db/data/photosData.csv' WITH (FORMAT csv)



// List Questions
// Retrieves a list of questions for a particular product. This list does not include any reported questions.
const retrieveQuestionsList = (id = 1, count = 5, callback) => {
    client.connect();
    client.query(`SELECT * FROM questions WHERE product_id = ${id} LIMIT ${count}`, (err, res) => {
        if (err) {
            callback(err);
        } else {
            callback(res.rows);
            client.end();
        }
    }); 
};

// Answers List
// Returns answers for a given question.This list does not include any reported answers.
const retrieveAnswersList = (id = 1, count = 5, callback) => {
    client.connect();
    // Add in the query to find the photos for an answer
    client.query(`SELECT * FROM answers WHERE question_id = ${id} LIMIT ${count}`, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
            client.end();
        }
    });
};

retrieveAnswersList(10, 5, (err, data) => { console.log(data); })

// Add a Question
// Adds a question for the given product
const addAQuestionToDB = (productId, body, callback) => {
    client.connect();
    client.query(`INSERT INTO questions(question_body, question_date, asker_name, question_helpfulness, reported, email, product_id) VALUES (${body.body}, ${new Date()}, ${body.name}, ${0}, ${0}, ${body.email}, ${productId})`, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
            client.end();
        }
    });

};
// Add an Answer
// Adds an answer for the given question
const addAnAnswerToDB = (questionId, body, callback) => {
    client.connect();
    // Email part of the answer not added here but it is requested and sent on the client side.
    client.query(`INSERT INTO answers(body, date, answerer_name, helpfulness, question_id) VALUES (${body.body}, ${new Date()}, ${body.name}, ${0} ,${questionId})`, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
            client.end();
        }
    });



};

// Mark Question as Helpful
// Updates a question to show it was found helpful.
const updateQuestionHelpful = (questionId, callback) => {
    client.connect();
    client.query(`UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${questionId}`, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
            client.end();
        }
    })
}


// Report Question
// Updates a question to show it was reported.Note, this action does not delete the question, but the question will not be returned in the above GET request.
const updateQuestionReported = (questionId, callback) => {
    client.connect();
    client.query(`UPDATE questions SET reported = reported + 1 WHERE question_id = ${questionId}`, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
            client.end();
        }
    })
}

// Mark Answer as Helpful
// Updates an answer to show it was found helpful.
const updateAnswerHelpful = (answerId, callback) => {
    client.connect();
    client.query(`UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = ${answerId}`, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
            client.end();
        }
    })
}

// Report Answer -- WONT WORK TILL IS ADDED IN DB 
// Updates an answer to show it has been reported.Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
// const updateAnswerReported = (answerId, callback) => {
//     client.connect();
//     client.query(`UPDATE answers SET reported = reported + 1 WHERE answer_id = ${answerId}`, (err, res) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             callback(null, res);
//             client.end();
//         }
//     })
// }

module.exports = {
    retrieveQuestionsList,
    retrieveAnswersList,
    addAnAnswerToDB,
    addAQuestionToDB,
    updateQuestionHelpful,
    updateAnswerHelpful,
    updateQuestionReported,
    // updateAnswerReported,
}
