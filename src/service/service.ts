import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER
});

interface CreateGameData {
    joinCode: string;
    newGameId: string;
};

export async function createGame(questions: string[], duration: number) {
    const { data } = await api.post('/games/', {
        questions,
        duration
    });

    return data as CreateGameData;
}

interface JoinGameData {
    joinedGameId: string;
    participantId: string;
};

export async function joinGame(joinCode: string, name: string) {
    const { data } = await api.post(`/games/${joinCode}/join`, {
        name,
    });

    return data as JoinGameData;
}

interface StartGameData {

}

export async function startGame(gameId: string) {
    const { data } = await api.post(`/games/${gameId}/start`);

    return data as StartGameData;
}

interface submissionReadData {

}

export async function markSubmissionRead(gameId: string, roundId: string, submissionId: string) {
    const { data } = await api.post('/submissions', {
        gameId,
        roundId,
        submissionId,
    });

    return data as submissionReadData;
}