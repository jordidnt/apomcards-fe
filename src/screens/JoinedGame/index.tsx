import React from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../lib/firebase';
import { useFirestoreCollection, useFirestoreDoc } from '../../hooks/useGameListener';

interface NavigationParams {
    gameId: string;
    participantId: string;
}

const JoinedGame: React.FC = () => {
    const { gameId, participantId } = useParams<NavigationParams>();
    const gameRef = firestore.collection('games').doc(gameId);
    const docState = useFirestoreDoc(gameRef);
    const gameData = docState?.data();

    const roundsRef = firestore.collection('games').doc(gameId).collection('rounds');
    const roundsDocState = useFirestoreCollection(roundsRef);
    const roundsData = roundsDocState?.map(doc => doc.data())

    // Game has Started
    if (gameData?.startedAt !== null && gameData?.currentRound !== null) {
            const currentRound = roundsData?.find(round => {
                return round?.numberInRound === gameData?.currentRound;
            })
            const questionNumber = gameData?.currentRound + 1;
            console.log(currentRound);
            const lengthOfRound = gameData?.roundDuration;
            const roundStarted = new Date(currentRound?.startedAt?.seconds * 1000);
            const roundEnds = new Date(roundStarted.valueOf() + lengthOfRound * 1000);
            const now = new Date();

            // if (ranOutOfTime) {
            //     return <div>

            //     </div>
            // }

            return <div>
                <h3>Question {questionNumber}:</h3>
                <h4>{currentRound?.question}</h4>

                <input placeholder="Type answer here"/>
                <button>Submit</button>
                <p>Question {questionNumber}/{roundsData?.length}</p>

                {/* This stuff is for checking if the round is active - need to use a timer and make sure it updates realtime */}
                <div>{lengthOfRound}</div>
                <div>{roundStarted.toLocaleTimeString()}</div>
                <div>{roundEnds.toLocaleTimeString()}</div>
                <div>{now.toLocaleTimeString()}</div>
                <div>{
                        (roundEnds < now && now > roundStarted) ? <p>The round has ended</p> : <p>Round is active</p>
                    
                    }</div>
            </div>
    }

    return <div>
        <h2>Joined Game {gameId} as {participantId}</h2>
        <p>Bookmark this URL to get back to your game, don't share the link unless you want to give someone access to host it for you.</p>
        <h4>Join code: {gameData?.joinCode}</h4>
        <p>Rounds will last {gameData?.roundDuration} seconds</p>
        {
            gameData?.startedAt === null ? <p>The game has not started yet</p> : null
        }
        {/* <div> */}
            {/* {participantData?.map((participant, index) => { */}
                {/* return <div key={index}>{participant?.name}</div> */}
            {/* })} */}
        {/* </div> */}
    </div>
}

export default JoinedGame;