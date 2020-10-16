const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.static('../client/dist'));
app.use(express.json());


// GET all the Product Questions List
app.get('/qa/:product_id', (req, res) => {
  const id = req.params.product_id;
});

// GET all the Answers List
app.get('/qa/:question_id/answers', (req, res) => {
  const id = req.params.question_id;
});

// POST Adding a Question
app.post('/qa/:product_id', (req, res) => {
  const id = req.params.product_id;

});

// POST Adding an Answer
app.post('/qa/:question_id', (req, res) => {
  const id = req.params.question_id;
});

// PUT for Helpful Questions
app.put('/qa/question/:question_id/helpful', (req, res) => {
  const id = req.params.question_id;
});

// PUT for Helpful Answers
app.put('/qa/answer/:answer_id/helpful', (req, res) => {
  const id = req.params.answer_id;
});

// PUT for Report Questions
app.put('/qa/question/:question_id/report', (req, res) => {
  const id = req.params.question_id;
});

// PUT for Report Answers
app.put('/qa/answer/:answer_id/report', (req, res) => {
  const id  = req.params.answer_id;
});


app.listen(PORT, () => {
  console.log(`Server running and listening on port: ${PORT}`);
});
