const express = require('express');
const query = require('./db/queries');
const app = express();
const PORT = 3001;

app.use(express.static('../client/dist'));
app.use(express.json());



const dataParser = (data) => {
  const resultsArray = [];
  let photosArray = [];
  let photoObject = {};
  let answersObject = {};
  let answer = {};
  let question = {}

  for (let i = 0; i < data.rows.length; i++) {
    const row = data.rows[i];
    // Check if the last row had the same question_id
    if (data.rows[i - 1] && row.q_id === data.rows[i - 1].q_id) {
      // -- If it does, dont want to create a new question Object
      //
      // ---- Check if the answer_id is the same as the previous id
      if (row.a_id === data.rows[i - 1].a_id) {
        // ------ If it is, add to the photos Array
        // ADD the photo in the current row, to the dataset from the previous passes
        photoObject = {};
        photoObject.id = row.p_id;
        photoObject.url = row.url;

        photosArray.push(photoObject);
      } else {
        // ------ If it isnt, add to the answers array AND the photos to the photos array
        if (row.a_id) {

          answer = {}; // New Answer new Object
          photoObject = {};

          photosArray = [];
          
          photoObject.id = row.p_id || null;
          photoObject.url = row.url || "";
          
          // Push that photo into our photos array
          photosArray.push(photoObject);
            
          // Same answersObject
          
          answer.id = row.a_id || null;
          answer.body = row.body || "";
          answer.date = row.date || "";
          answer.answerer_name = row.answerer_name || "";
          answer.helpfulness = row.helpfulness || null;
          answer.photos = photosArray;
          
          question.answers[row.a_id] = answer;
        }
      }
      
    } else {
      // Redefine everything to be empty
      if (Object.keys(question).length > 1) {
        resultsArray.push(question);
      }
      question = {};
      answersObject = {};
      answer = {};
      photosArray = [];
      photoObject = {};
      // -- If it doesn't we want to create a new question Object
      
      // Define the photo on this record
      photoObject.id = row.p_id || null;
      photoObject.url = row.url || "";

      // Push that photo into our photos array
      photosArray.push(photoObject);

      // Define our answer on this record
      answer.id = row.a_id || null;
      answer.body = row.body || "";
      answer.date = row.date || "";
      answer.answerer_name = row.answerer_name || "";
      answer.helpfulness = row.helpfulness || null;
      answer.question_id = row.question_id || null;
      answer.photos = photosArray;

      // Put that answer into the answers object
      answersObject[row.a_id] = answer;

      // Define our question
      question.question_id = row.q_id || null;
      question.question_body = row.question_body || "";
      question.question_date = row.question_date || "";
      question.asker_name = row.asker_name || "";
      question.reported = row.reported || null;
      question.email = row.email || "";

      // Put our answersObject into our question
      question.answers = answersObject;
      
    }
  } // END FOR LOOP


  const returnObject = {
    product_id: data.rows[0].product_id,
    results: resultsArray
  }

  return returnObject;
}

// GET all the Product Questions List
app.get('/qa/:product_id', (req, res) => {
  const id = req.params.product_id;
  query.retrieveQuestionsList(id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      const data = dataParser(results);
      res.status(200).send(data);
    }
  })
});

// GET all the Answers List
app.get('/qa/:question_id/answers', (req, res) => {
  const id = req.params.question_id;
  const count = (req.params.count ? req.params.count : 5 ); 
  query.retrieveAnswersList(id, count, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  })
});

// POST Adding a Question
app.post('/qa/:product_id', (req, res) => {
  const id = req.params.product_id;
  const body = req.params.body;
  query.addAQuestionToDB(id, body, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(204).send(results);
    }
  })
});

// POST Adding an Answer
app.post('/qa/:question_id', (req, res) => {
  const id = req.params.question_id;
  const body = req.params.body;
  query.addAnAnswerToDB(id, body, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(204).send(results);
    }
  })
});

// PUT for Helpful Questions
app.put('/qa/question/:question_id/helpful', (req, res) => {
  const id = req.params.question_id;
  query.updateQuestionHelpful(id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(204).send(results);
    }
  })
});

// PUT for Helpful Answers
app.put('/qa/answer/:answer_id/helpful', (req, res) => {
  const id = req.params.answer_id;
  query.updateAnswerHelpful(id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  })
});

// PUT for Report Questions
app.put('/qa/question/:question_id/report', (req, res) => {
  const id = req.params.question_id;
  query.updateQuestionReported(id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  })
});

// PUT for Report Answers
app.put('/qa/answer/:answer_id/report', (req, res) => {
  const id  = req.params.answer_id;
});


app.listen(PORT, () => {
  console.log(`Server running and listening on port: ${PORT}`);
});
