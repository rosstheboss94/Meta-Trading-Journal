import { FirebaseDb } from "../../models/firebase/firebase";

export const addTradeController = (currentUser, selectedJournal, data) => {
  const db = new FirebaseDb();
  db.addTrade(currentUser, selectedJournal, data);
};

export const getAllTradesController = async (currentUser, selectedJournal) => {
  const db = new FirebaseDb()
  const trades = await db.getTrades(currentUser, selectedJournal)
  return trades
};
