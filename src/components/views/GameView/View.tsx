import React, { useState } from 'react';
import { Game, Participant, Submission } from '../../../lib/adapter/types';

interface Props {
    participants: (Participant | undefined)[];
    submissions: (Submission | undefined)[];
    onCardClicked: (submissionId: string) => void;
}

interface Card extends Participant {
    submission: Submission;
}

export const View: React.FC<Props> = ({participants, submissions, onCardClicked}) => {

    const cards = participants.map(participant => {
        const submission = submissions.find(submission => participant?.id === submission?.participantId);
        return {
            submission,
            ...participant,
        };
    })

    console.log(cards)

    return <div style={{backgroundColor: 'lightgray'}}>Game View
        <div>
            {
                cards.map(card => (
                    <div onClick={() => onCardClicked(card.submission?.id ?? '')}>{card.submission?.isRevealed ? card.submission?.text : card.name}</div>
                ))
            }
        </div>
    </div>
};

