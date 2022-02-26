import { db } from "../../firebase/firebase";
import { doc, collection, setDoc, getDocs } from "firebase/firestore";

export class FirebaseDb {
  constructor() {}

  addJournal(user, journalName, data) {
    setDoc(this.getJournalPath(user, journalName), data);
  }

  addTrade(user, journalName, data) {
    setDoc(this.getTradePath(user, journalName), data, { merge: true });
  }

  getTrades = async (user, journalName) => {
    const querySnapshot = await getDocs(
      this.getAllTradesPath(user, journalName)
    );
    let trades = [];

    querySnapshot.forEach((doc) => {
      trades.push({ tradeData: doc.data(), id: doc.id });
    });

    return trades;
  };

  getJournalPath(user, journalName) {
    return doc(db, `users/${user}/journals/${journalName}`);
  }

  getTradePath(user, journalName) {
    return doc(collection(db, `users/${user}/journals/${journalName}/trades`));
  }

  getAllTradesPath(user, journalName) {
    return collection(db, `users/${user}/journals/${journalName}/trades`);
  }
}
