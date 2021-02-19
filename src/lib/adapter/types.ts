import firebase from "firebase"

export interface Game {
    id: string;
    currentRound: number | null;
    joinCode: string;
    roundDuration: number;
    startedAt: firebase.firestore.Timestamp | null;    
}

export interface Round {
    id: string;
    gameId: string;
    numberInRound: number;
    question: string;
    startedAt: firebase.firestore.Timestamp | null;    
}

export interface Participant {
    id: string;
    gameId: string;
    name: string;
    score: number;
}

export interface Submission {
    id: string;
    participantId: string;
    roundId: string;
    pointAwarded: boolean;
    isRevealed: boolean;
    text: string;
}
