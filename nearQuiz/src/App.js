import 'regenerator-runtime/runtime'
import React, {useEffect, useState} from 'react'
import { login, logout } from './utils'
import './global.css'
import QuestItem from './components/QuestItem.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {
  Button,
  Container,
  Navbar,
  Nav,
  Row,
  Col,
} from 'react-bootstrap';


import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

function App() {
  const [ question, setQuestion ] = useState('');
  const [choice1, setChoice1] = useState('');
  const [choice2, setChoice2] = useState('');
  const [answer, setAnswer] = useState(1);
  const [listQuestion, setListQuestion] = useState([])
  const [fetch, setFetch] = useState(false)
  const handleQuestionChange = event =>{
    setQuestion(event.target.value);
  }


  const handleSubmit = async() =>{
    event.preventDefault()
    console.log(question)
    await window.contract.addQuestion({_question: question,_choice1: choice1,_choice2: choice2,_answer: parseInt(answer)});
  }
  const handleChoice1Change = event =>{
    setChoice1(event.target.value)
  }
  const handleChoice2Change = event =>{
    setChoice2(event.target.value)
  }
  const handleAnswerChange = event =>{
    setAnswer(event.target.value)
  }

  const showList= async() =>{
    setListQuestion(await window.contract.getListQuestion());
    setFetch(true)
  }
  return (
    <div>
      <Container>
      <Nav.Link onClick={window.accountId === '' ? login : logout}>{window.accountId === '' ? 'Login' : window.accountId}</Nav.Link>
        <div className="justify-content-center">
          <h2> Add Question </h2>
          <form onSubmit={handleSubmit}>
          <Row>
            <Col>
            <label>
              Question:
            </label>
            </Col>
            <Col>
              <input type="text" value={question} onChange={handleQuestionChange} />
            </Col>
          </Row>
          <Row>
            <Col>
            <label>
              Answer 1:
            </label>
            </Col>
            <Col>
              <input type="text" value={choice1} onChange={handleChoice1Change} />
            </Col>
          </Row>
          <Row>
            <Col>
            <label>
              Answer 2:
            </label>
            </Col>
            <Col>
              <input type="text" value={choice2} onChange={handleChoice2Change} />
            </Col>
          </Row>
          <Row>
            <Col>
            <label>
              Right answer:
            </label>
            </Col>
            <Col>
              <input type="text" value={answer} onChange={handleAnswerChange} />
            </Col>
          </Row>
          <Row>
            <Button variant="success" onClick={handleSubmit}>Submit</Button>
          </Row>
          </form>
        </div>
        <Button variant="info" onClick={showList}>List Question</Button>
        <div>
          {fetch == true ?(
          listQuestion.map(quest=>(
            <QuestItem
              quest = {quest}
              window = {window}
            />
          )
          )

          ):(
            <p> there is no question </p>
          )}
        </div>
      </Container>
    </div>
  );
}
export default App
