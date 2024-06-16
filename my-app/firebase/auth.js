import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./Config";
import { createUser } from "./users";

const signUpHandler = async (email, firstName, lastName, password, setError, router) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      uuid: cred.user.uid,
    };
    await createUser(data);
    router.replace("/Home");
    console.log(cred.user.email);
  } catch (err) {
    const message = err.message.substring(err.message.indexOf(":") + 1).trim();
    setError(message);
    console.log(err.message);
  }
};

const signInHandler = async (email, password, setError, router) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    router.replace("/Home");
  } catch (err) {
    const message = err.message.substring(err.message.indexOf(":") + 1).trim();
    setError(message);
    console.log(err.message);
  }
};

const signOutHandler = async (router) => {
  await signOut(auth);
  router.replace("/account/Login");
};

export { signUpHandler, signInHandler, signOutHandler };
