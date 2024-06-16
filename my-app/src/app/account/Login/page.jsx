"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { signInHandler } from "../../../../firebase/auth"; // Adjust the import path as needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize the router

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    signInHandler(email, password, setError, router); // Pass router to signInHandler
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <label>
          <h2>Email:</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        <label>
          <h2>Password:</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        <button type="submit" className="btn-primary">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;
