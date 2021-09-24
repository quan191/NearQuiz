import React, { useState, useEffect } from 'react'
import {Button,Row,Col} from 'react-bootstrap';
const QuestItem = (props) => {
    const [ quest, setQuest ] = useState(props.quest);
    const [submitAns, setSubmitAns] = useState();
    useEffect(
    () => {
      setQuest(props.quest)
    },
    [ props ]
    )
    const handleAnswerChange = event => {
        setSubmitAns(parseInt(event.target.value))
    }
    const handleQuestSubmit = async() =>{
        event.preventDefault();
        const result = await window.contract.answerQuestion({_quest_id: quest.id,_choice: submitAns});
        console.log(result)
    }
    return (
        <div>
        <form onSubmit={handleQuestSubmit}>
        <Row>
            <Col>
            <label>
              Question number:
            </label>
            </Col>
            <Col>
              <input type="text" value={quest.id} readOnly={true} />
            </Col>
          </Row>
          <Row>
            <Col>
            <label>
              Question detail:
            </label>
            </Col>
            <Col>
              <input type="text" value={quest.question} readOnly={true} />
            </Col>
          </Row>
          <Row>
            <Col>
            <label>
              Answer 1:
            </label>
            </Col>
            <Col>
              <input type="text" value={quest.choice1} readOnly={true}/>
            </Col>
          </Row>
          <Row>
            <Col>
            <label>
              Answer 2:
            </label>
            </Col>
            <Col>
              <input type="text" value={quest.choice2} readOnly={true} />
            </Col>
          </Row>
          <Row>
            <Col>
            <label>
              YOur Answer :
            </label>
            </Col>
            <Col>
              <input type="text" onChange={handleAnswerChange} />
            </Col>
          </Row>
          <Row>
            <Button variant="success" onClick={handleQuestSubmit}>Submit</Button>
          </Row>
          </form>
        </div>
    )
}
export default QuestItem
