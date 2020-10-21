const express = require('express');
const query = require('./db/queries');
const app = express();
const PORT = 3001;

app.use(express.static('../client/dist'));
app.use(express.json());


// GET all the Product Questions List
app.get('/qa/:product_id', (req, res) => {
  const id = req.params.product_id;
  const count = (req.params.count ? req.params.count : 1); 
  query.retrieveQuestionsList(id, count, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  })
});

// GET all the Answers List
app.get('/qa/:question_id/answers', (req, res) => {
  const id = req.params.question_id;
  const count = (req.params.count ? req.params.count : 1); 
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
