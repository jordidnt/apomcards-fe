import React, { useState } from 'react';
import { useFirestoreCollection } from '../../../hooks/useGameListener';
import { adaptSubmission } from '../../../lib/adapter';
import { Game, Participant } from '../../../lib/adapter/types';
import { firestore } from '../../../lib/firebase';
import { markSubmissionRead } from '../../../service/service';
import { View } from './View';

interface Props {
    game: Game;
    participants: (Participant | undefined)[];
    roundId: string;
}

export const GameView : React.FC<Props> = ({game, participants, roundId}) => {
    const submissionsRef = firestore.collection('games')
        .doc(game.id)
        .collection('rounds')
        .doc(roundId)
        .collection('submissions');
    const submissionsDocState = useFirestoreCollection(submissionsRef);
    const submissionsData = submissionsDocState?.map(doc => adaptSubmission(doc.data(), doc.id)) ?? [];
    // map submissions to participants -> convert to cards?
    const onCardClicked = async (submissionId: string) => {
        const result = await markSubmissionRead(game.id, roundId, submissionId);
    };

    console.log(submissionsData);
    return <View participants={participants} submissions={submissionsData} onCardClicked={onCardClicked} />;
};


