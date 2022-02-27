import { db } from "../../firebase/firebase";
import { doc, collection, setDoc, getDocs, updateDoc } from "firebase/firestore";

export class FirebaseDb {
  constructor() { }

  addJournal(user, journalName, data) {
    setDoc(this.getJournalPath(user, journalName), data);
  }

  addTrade(user, journalName, data) {
    setDoc(this.addTradePath(user, journalName), data, { merge: true });
  }

  getJournals = async (user) =>{
    const querySnapshot = await getDocs(this.getAllJournalsPath(user))
    const journals = [];

      querySnapshot.forEach((doc) => {
        journals.push({[doc.id]: doc.data()})
      });
    
      return journals;
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

  setWinOrLoss = async (user, journalName, tradeId, tradeResult) => {
    const tradeRef = this.getTradePath(user, journalName, tradeId);
    updateDoc(tradeRef, { WinOrLoss: tradeResult.toUpperCase() });
  };

  getJournalPath(user, journalName) {
    return doc(db, `users/${user}/journals/${journalName}`);
  }

  getTradePath(user, journalName, tradeId) {
    return doc(db, `users/${user}/journals/${journalName}/trades/${tradeId}`);
  }

  addTradePath(user, journalName) {
    return doc(collection(db, `users/${user}/journals/${journalName}/trades`));
  }

  getAllJournalsPath(user){
    return collection(db, `users/${user}/journals`)
  }

  getAllTradesPath(user, journalName) {
    return collection(db, `users/${user}/journals/${journalName}/trades`);
  }
}
