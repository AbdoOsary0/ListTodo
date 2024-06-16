import { db } from "./Config";
import { getCurrentUserUuid } from "./users";
import {
  collection,
  addDoc,
  deleteDoc,
  query,
  getDocs,
  doc,
  where,
  onSnapshot,
} from "firebase/firestore";

const collectionReference = collection(db, "todos");

const CreateTodo = async (data) => {
  try {
    const newTodo = await addDoc(collectionReference, data);
    console.log("Success in adding Todo: " + newTodo.id);
  } catch (err) {
    console.log("Failed to add: " + err.message);
  }
  console.log(data);
};

const deleteItem = async (item) => {
  try {
    const docRef = doc(db, "todos", item);
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error.message);
  }
};

const getTodos = async () => {
  try {
    const q = query(
      collectionReference,
      where("uuid", "==", getCurrentUserUuid())
    );
    const querySnapshot = await getDocs(q);
    const fetchedTodos = [];
    querySnapshot.forEach((doc) => {
      fetchedTodos.push({ id: doc.id, ...doc.data() });
    });
    return fetchedTodos;
  } catch (error) {
    console.error("Error fetching todos:", error.message);
  }
};
function subscribe(callback) {
  const unsubscribe = onSnapshot(query(collection(db, "todos")), (snapshot) => {
    const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
    snapshot.docChanges().forEach((change) => {
      if (callback) callback({ change, snapshot });
    });
  });
  return unsubscribe;
}

export { CreateTodo, getTodos, deleteItem, subscribe };
