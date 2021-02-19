import React from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../lib/firebase';
import { useFirestoreCollection, useFirestoreDoc } from '../../hooks/useGameListener';
import { startGame } from '../../service/service';
import { useTimer } from '../../hooks/useTimer';
import { GameView } from '../../components/views/GameView';
import { adaptGame, adaptParticipant, adaptRound } from '../../lib/adapter';

interface NavigationParams {
    id: string;
}

const HostedGame: React.FC = () => {
    const { id } = useParams<NavigationParams>();
    const gameRef = firestore.collection('games').doc(id);
    const docState = useFirestoreDoc(gameRef);
    const gameData = adaptGame(docState?.data(), docState?.id);
    
    const roundsRef = firestore.collection('games').doc(id).collection('rounds');
    const roundsDocState = useFirestoreCollection(roundsRef);
    const roundsData = roundsDocState?.map(doc => adaptRound(doc.data(), doc.id)) ?? []

    const currentRound = roundsData?.find(round => {
        return round?.numberInRound === gameData?.currentRound;
    })
    console.log(gameData);
    const participantsRef = firestore.collection('games').doc(id).collection('participants');
    const participantsDocState = useFirestoreCollection(participantsRef);
    const participantData = participantsDocState?.map(doc => adaptParticipant(doc.data(), doc.id)) ?? [];

    const isGameStarted = gameData?.startedAt !== null;

    const timeLeft = useTimer(gameData?.roundDuration ?? 0, isGameStarted);

    const onStartGameClicked = async () => {
        await startGame(id);
    };

    // In progress View
    if (isGameStarted) {
        return <div>
            game started
            <div>{timeLeft} left in round</div>
            {!!gameData && !!currentRound?.id && <GameView game={gameData} participants={participantData} roundId={currentRound.id} />}
            {timeLeft === 0 && (
                <div>
                    <button>Reveal All</button>
                    <button>Next Question</button>
                </div>
            )}
        </div>    
    }

    // Not yet started
    return <div>
        <h2>Hosted Game id: {id}</h2>
        <p>Bookmark this URL to get back to your game, don't share the link unless you want to give someone access to host it for you.</p>
        <h4>Join code: {gameData?.joinCode}</h4>
        <p>Rounds will last {gameData?.roundDuration} seconds</p>
        <button onClick={onStartGameClicked}>Start</button>
        <div>
            {participantData?.map((participant, index) => {
                return <div key={index}>{participant?.name}</div>
            })}
        </div>
    </div>
}

export default HostedGame;