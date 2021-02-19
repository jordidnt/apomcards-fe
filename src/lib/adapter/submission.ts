import firebase from "firebase"
import { Submission } from "./types"

export const adaptSubmission = (data?: firebase.firestore.DocumentData, id?: string): Submission | undefined => {
    if (!data) return;
    return {
        id: id ?? '',
        roundId: data?.roundId ?? '',
        participantId: data?.participantId ?? '',
        isRevealed: data?.isRevealed ?? false,
        pointAwarded: data?.pointAwarded ?? false,
        text: data?.text ?? '',
    }
}

