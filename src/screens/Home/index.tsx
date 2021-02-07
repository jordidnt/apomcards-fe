import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { joinGame } from '../../service/service';

const Home: React.FC = () => {
    const [joinCode, setJoinCode] = useState('');
    const [name, setName] = useState('');
    const history = useHistory();

    const onJoinGamePressed = async () => {
        const result = await joinGame(joinCode, name);
        console.log(result);
        if (result.joinedGameId) {
            history.push(`/joinedGame/${result.joinedGameId}/${result.participantId}`)
        }
    }

    return <div>
        <h1>Home</h1>
        <Link to="/newGame">Host</Link>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
        <input type="text" placeholder="Join Code" value={joinCode} onChange={e => setJoinCode(e.target.value)} />
        <button onClick={onJoinGamePressed}>Join</button>

    </div>
};

export default Home;