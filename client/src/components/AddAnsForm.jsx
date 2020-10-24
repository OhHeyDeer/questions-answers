/* eslint-disable max-len */
import React, {useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Figure';

const AddAnsForm = ({onHide, question, getProductQs, answers}) => {
  const [validated, setValidated] = useState(false);
  const [state, setAForm] = useState({
    body: '',
    name: '',
    email: '',
    // photos: [],
  });

  const handleChange = (e) => {
    // console.log('HC', e.target);
    setAForm({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitA = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
    axios.post(`http://localhost:3001/qa/${question.question_id}/answers`, {...state})
        .then((res) => {
          // console.log(res.config.data);
          onHide();
          getProductQs(question.question_id);
        })
        .catch((err) => console.error(err));
  };

  return (
    <Form style={{borderRadius: '12px', marginBottom: '0px'}}
      onSubmit={handleSubmitA}
      noValidate validated={validated}
    >
      <Form.Group controlId="form.TextAreaValidation">
        <Form.Label></Form.Label>
        <Form.Control required as="textarea" rows="3"
          maxLength="1000"
          name="body"
          value={state.body}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please enter your question before submitting.*
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="NicknameValidation">Nickname*
        <Form.Control required type="text" placeholder="Example:jackson11!"
          maxLength="60"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a nickname.*
        </Form.Control.Feedback>

        <Form.Text className="text-muted">
        For privacy reasons, do not use your full name or email address.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="EmailValidation">
        Email address*
        <Form.Control required type="email" maxLength="60"
          placeholder="Example: jack@email.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please enter your email address..
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          For authentication reasons, you will not be emailed.
        </Form.Text>
      </Form.Group>

      {/* <Form.Group>
        <Form.File id="exampleFormControlFile1" label="Submit photo(s)"
          className="position-relative"
          name="photos"
          multiple
          // value={state.photos}
          // onChange={fileSelectedHandler}
          // isInvalid={!!errors.file}
          // feedback={errors.file}
          // feedbackTooltip
        />
      </Form.Group> */}


      <Button variant="dark" type="submit">
       Submit
      </Button>
    </Form>
  );
};

export default AddAnsForm;
