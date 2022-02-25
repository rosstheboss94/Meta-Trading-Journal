import { FirebaseDb } from "../../models/firebase/firebase";

export const addTradeController = (currentUser, selectedJournal, data) => {
  const db = new FirebaseDb();
  db.addTrade(currentUser, selectedJournal, data);
};
