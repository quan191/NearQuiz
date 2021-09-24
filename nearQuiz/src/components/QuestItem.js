import React, { useState, useEffect } from 'react'
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
            <label>
              Question Number:
              <input type="text" value={quest.id} readOnly={true} />
            </label>
            <label>
              Question :
              <input type="text" value={quest.question} readOnly={true}/>
            </label>
            <label>
              Answer 1:
              <input type="text" value={quest.choice1} readOnly={true}/>
            </label>
            <label>
              Answer 2:
              <input type="text" value={quest.choice2} readOnly={true}/>
            </label>
            <label>
              Your answer:
              <input type="text" onChange={handleAnswerChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
    )
}
export default QuestItem
