import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./Config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config";

const collectionReference = collection(db, "users");

let authUserUuid;

onAuthStateChanged(auth, (user) => {
  if (user) {
    authUserUuid = user.uid;
  }
});

const createUser = async (data) => {
  await addDoc(collectionReference, data);
};

const getUser = async (uuid) => {
  const q = query(collectionReference, where("uuid", "==", uuid));
  try {
    const promise = await getDocs(q);
    return { ...promise.docs[0].data(), id: promise.docs[0].id };
  } catch (err) {
    console.log("getUser: ", err.message);
  }
};

const getCurrentUserUuid = () => {
  return authUserUuid;
};

const getAllUsers = async () => {
  try {
    const promise = await getDocs(collectionReference);
    const users = [];
    promise.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    return users;
  } catch (err) {
    console.log("getAllUsers: ", err.message);
  }
};

const updateUser = async (data, uuid) => {
  try {
    const user = await getUser(uuid);
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    const documentReference = doc(db, "users", user.id);
    await updateDoc(documentReference, data);
    console.log("user updated successfully!");
    return user;
  } catch (err) {
    console.log("updateUser: ", err.message);
  }
};

const deleteUser = async (id) => {
  const docReference = doc(db, "users", id);
  try {
    await deleteDoc(docReference);
  } catch (err) {
    console.log("deleteUser: ", err.message);
  }
};

export {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  getCurrentUserUuid,
};
