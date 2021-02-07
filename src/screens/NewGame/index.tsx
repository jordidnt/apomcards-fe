import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createGame } from '../../service/service';
const AddQuestionRow: React.FC<{onClick: () => void}> = ({onClick}) => {
    return <button onClick={onClick} title="Add Question">Add Question</button>
}

const QuestionRow: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({value, onChange}) => {
    return <div>
        <input type="text" placeholder="Question" value={value} onChange={onChange} />
    </div>
}

const NewGame: React.FC = () => {
    const [questions, setQuestions] = useState(['']);
    const [duration, setDuration] = useState(60);
    let history = useHistory();

    const onCreateGameClicked = async () => {
        console.log(questions, duration);
        const result = await createGame(questions, duration);
        if (result.newGameId) {
            console.log(result);
            history.push(`/game/${result.newGameId}`)
        }
    };

    return <div>
        <h1>New Game</h1>
        {questions.map((_, index) => (
            <QuestionRow 
                key={index}
                value={questions[index]} 
                onChange={e => { 
                    const copyOfQuestions = [...questions];
                    copyOfQuestions[index] = e.target.value;
                    setQuestions(copyOfQuestions);
                    }
                }
            />))
        }

        <AddQuestionRow 
            onClick={() => setQuestions(previous => previous.concat(['']))}
         />
        <div>
        <input type="number" placeholder="Duration (seconds)" value={duration} onChange={e => setDuration(parseInt(e.target.value))} />
        </div>
        <div>
        <button title="Create Game" onClick={onCreateGameClicked}>Create Game</button>
        </div>

    </div>
};

export default NewGame;