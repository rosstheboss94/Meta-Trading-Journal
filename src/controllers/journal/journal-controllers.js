import { FirebaseDb } from "../../models/firebasedb/firebase-db-model";

export const addJournalController = (currentUser, journalName, data) => {
    const db = new FirebaseDb()
    db.addJournal(currentUser, journalName, data);
}

export const getJournalsController = async (currentUser) => {
    const db = new FirebaseDb()
    const journals = await db.getJournals(currentUser);
    return journals;
}