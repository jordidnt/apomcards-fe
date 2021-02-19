import firebase from "firebase"
import { Round } from "./types"

export const adaptRound = (data?: firebase.firestore.DocumentData, id?: string): Round | undefined => {
    if (!data) return;
    return {
        id: id ?? '',
        gameId: data?.gameId ?? '',
        numberInRound: data?.numberInRound ?? 0,
        question: data?.question ?? '',
        startedAt: data?.startedAt ?? null,
    }
}

