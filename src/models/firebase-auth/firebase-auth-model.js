import firebaseApp from "../../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword,
signInWithEmailAndPassword } from "firebase/auth";

export class FirebaseAuth {
    constructor() {
        this.auth = getAuth(firebaseApp)
    }

    createUser = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password
        )

        return userCredential.user;
    }

    signIn = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(
            this.auth,
            email,
            password
        )

        return userCredential.user;
    }
}