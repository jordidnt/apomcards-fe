import firebase from "firebase"
import { Game } from "./types"

export const adaptGame = (data?: firebase.firestore.DocumentData, id?: string): Game | undefined => {
    if (!data) return;
    return {
        id: id ?? '',
        currentRound: data?.currentRound ?? null,
        joinCode: data?.joinCode ?? '',
        roundDuration: data?.roundDuration ?? 0,
        startedAt: data?.startedAt ?? null,

    }
}

