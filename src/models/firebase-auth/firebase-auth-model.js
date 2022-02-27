import firebaseApp from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export class FirebaseAuth{
    constructor(){
        this.auth = getAuth(firebaseApp)
    }
    createUser = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password
          )
        
          return userCredential.user;
            /*.then((userCredential) => {
              user = userCredential.user;
              AddUserToDb(user);
            })
            .catch((error) => {});*/
    }
}