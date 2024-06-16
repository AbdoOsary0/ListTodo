"use client";
import { useEffect, useState } from "react";
import { signOutHandler } from "../../../firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { CreateTodo, getTodos, subscribe, deleteItem } from "../../../firebase/todos";
import { getCurrentUserUuid } from "../../../firebase/users";

export default function Page() {
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const UserId = getCurrentUserUuid();
  const router = useRouter();

  const HandleCreateTodo = async (val) => {
    const newDate = { text: val, uuid: UserId };
    console.log(newDate);
    await CreateTodo(newDate);
    setTodo("");
    fetchData(); // Refresh the data after adding a new todo
  };

  const HandleDeleteTodo = async (id) => {
    await deleteItem(id);
    fetchData(); // Refresh the data after deleting a todo
  };

  const HandleLogout = () => {
    signOutHandler(router);
  };

  const fetchData = async () => {
    try {
      const fetchData = await getTodos();
      setData(fetchData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(({ change }) => {
      if (change.type === "added" || change.type === "modified" || change.type === "removed") {
        fetchData();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <form onSubmit={(e) => { e.preventDefault(); HandleCreateTodo(todo); }}>
        <label htmlFor="todo">New Todo:</label>
        <input
          id="todo"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter your to-do"
        />
        <button type="submit">Add To-do</button>
      </form>
      <div>
        <h3>Your Todos:</h3>
        <ul>
          {data.map((item) => (
            <li className="card" key={item.id}>
              <span>{item.text}</span>
              <button className="text-red-500 hover:text-red-700" onClick={() => HandleDeleteTodo(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <footer>
        <button onClick={HandleLogout} className="btn-secondary mt-4">Logout</button>
      </footer>
    </div>
  );
}
