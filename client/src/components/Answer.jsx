/* eslint-disable max-len */
import React, {useState} from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HelpfulBtn from './HelpfulBtn.jsx';
import AnswerPhoto from './AnswerPhoto.jsx';

const Answer = ({answer, isHelpfulA}) => {
  // eslint-disable-next-line max-len
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const d = new Date(answer.date);
  const year = d.getUTCFullYear();
  const monthId = d.getUTCMonth();
  let month = months[monthId];
  const day = d.getUTCDate();
  month = month.slice(0, 3);
  const newDate = `${month} ${day}, ${year}`;

  const [report, setReport] = useState(false);

  const reportAns = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/qa/answer/${answer.id}/helpful`)
        .then((res) => {
          setReport(!report);
          console.log(res);
        })
        .catch((err) => console.error(err));
  };

  return (
    <div className="q-a-one-answer">
      <Row>A:
        <Col>{answer.body}</Col>
      </Row>
      <Row className="qa-comment-data">by:
        {answer.answerer_name === 'Seller' || answer.answerer_name === 'seller'?
        <Col className="seller" style={{paddingTop: '4px'}}>
          {`${answer.answerer_name.toUpperCase()} ${' | '} ${newDate}`}</Col> : <Col>{`${answer.answerer_name} ${' | '} ${newDate}`}
          </Col>
        }
        <Col md="auto" className="qa-answer-btn">
          <HelpfulBtn
            className="a-btn"
            id={answer.id}
            clickFunc={isHelpfulA}
            currentCount={answer.helpfulness}
          />
          <button
            className="qa-report"
            // ref={btnRef}
            onClick={!report ? reportAns : null}
          >{report && '  ' + 'Reported'}{!report && '  ' + 'Report'}
          </button>
        </Col>
      </Row>
      <Row>
        <AnswerPhoto
          answer={answer}
        />
      </Row>
    </div>
  );
};

export default Answer;
