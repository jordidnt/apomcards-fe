import { useState, useEffect } from "react";

export const useFirestoreDoc = (ref: firebase.default.firestore.DocumentReference) => {
    const [docState, setDocState] = useState<firebase.default.firestore.DocumentSnapshot>();
    
    useEffect(() => {
      return ref.onSnapshot(doc => {
        setDocState(doc);
      });
    }, []);
    
    return docState;
}

export const useFirestoreCollection = (ref: firebase.default.firestore.CollectionReference) => {
    const [docState, setDocState] = useState<firebase.default.firestore.QueryDocumentSnapshot[]>();
    
    useEffect(() => {
      return ref.onSnapshot(({docs}) => {
        setDocState(docs);
      });
    }, []);
    
    return docState;
}

