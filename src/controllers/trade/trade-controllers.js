import { FirebaseDb } from "../../models/firebasedb/firebase-db-model";
import { FirebaseStorage } from "../../models/firebase-storage/firebase-storage-model";

export const addTradeController = (currentUser, selectedJournal, chartImg, data) => {
  const db = new FirebaseDb();
  db.addTrade(currentUser, selectedJournal, data);

  const storage = new FirebaseStorage();
  storage.uploadImg(chartImg);
};

export const getAllTradesController = async (currentUser, selectedJournal) => {
  const db = new FirebaseDb()
  const trades = await db.getTrades(currentUser, selectedJournal)
  return trades
};

export const setWinOrLossController = (user, journalName, tradeId, tradeResult) => {
  const db = new FirebaseDb()
  db.setWinOrLoss(user, journalName, tradeId, tradeResult);
}
