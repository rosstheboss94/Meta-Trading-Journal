import { FirebaseAuth } from "../../models/firebase-auth/firebase-auth-model"
import { FirebaseDb } from "../../models/firebasedb/firebase-db-model";

export const createUserController = async (email, password) => {
    const auth = new FirebaseAuth();
    const user = await auth.createUser(email, password);

    const db = new FirebaseDb();
    db.addUserToDb(user);
}

export const signInController = async (email, password) => {
    const auth = new FirebaseAuth();
    const user = await auth.signIn(email, password)

    return user;
}