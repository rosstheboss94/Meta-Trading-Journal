import { db } from "../../firebase/firebase";
import { doc, collection, setDoc } from "firebase/firestore";

export class FirebaseDb {
  constructor() {}

  async addJournal(user, journalName, data) {
    setDoc(this.getJournalPath(user, journalName), data);
  }

  addTrade(user, journalName, data) {
    setDoc(this.getTradePath(user, journalName), data, { merge: true });
  }
  getJournalPath(user, journalName) {
    //Creates document on the path w/ id being journalName
    return doc(db, `users/${user}/journals/${journalName}`);
  }

  getTradePath(user, journalName) {
    //Creates Document w/ auto gen. id at the end of the path
    return doc(collection(db, `users/${user}/journals/${journalName}/trades`));
  }
}
