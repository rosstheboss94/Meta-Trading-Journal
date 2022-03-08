import { FirebaseDb } from "../../models/firebasedb/firebase-db-model";
import { FirebaseStorage } from "../../models/firebase-storage/firebase-storage-model";

export const addTradeController = (
  currentUser,
  selectedJournal,
  chartImg,
  data
) => {
  const storage = new FirebaseStorage();
  storage.uploadImg(currentUser, selectedJournal, chartImg);

  setTimeout(() => {
    storage.setImgUrl(currentUser, selectedJournal, chartImg).then((downloadUrl) => {
      data.Url = downloadUrl;
      const db = new FirebaseDb();
      db.addTrade(currentUser, selectedJournal, data);
    });
  }, 2000);
};

export const getTradeImg = (imgUrl) => {

}

export const getAllTradesController = async (currentUser, selectedJournal) => {
  const db = new FirebaseDb();
  const trades = await db.getTrades(currentUser, selectedJournal);
  return trades;
};

export const setWinOrLossController = (
  user,
  journalName,
  tradeId,
  tradeResult
) => {
  const db = new FirebaseDb();
  db.setWinOrLoss(user, journalName, tradeId, tradeResult);
};
