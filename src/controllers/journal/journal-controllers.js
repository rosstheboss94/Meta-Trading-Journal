import { FirebaseDb } from "../../models/firebase/firebase";

export const addJournalController = (currentUser, journalName, data) => {
    const db = new FirebaseDb()
    db.addJournal(currentUser, journalName, data);
}