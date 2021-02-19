import firebase from "firebase"
import { Participant } from "./types"

export const adaptParticipant = (data?: firebase.firestore.DocumentData, id?: string): Participant | undefined => {
    if (!data) return;
    return {
        id: id ?? '',
        gameId: data?.gameId ?? '',
        name: data?.name ?? '',
        score: data?.score ?? 0,
    }
}

