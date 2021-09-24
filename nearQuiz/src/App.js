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
            <label>
              Question:
              <input type="text" value={question} onChange={handleQuestionChange} />
            </label>
            <label>
              Answer 1:
              <input type="text" value={choice1} onChange={handleChoice1Change} />
            </label>
            <label>
              Answer 2:
              <input type="text" value={choice2} onChange={handleChoice2Change} />
            </label>
            <label>
              Right answer:
              <input type="text" value={answer} onChange={handleAnswerChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <Button variant="success" onClick={showList}>List Question</Button>
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
