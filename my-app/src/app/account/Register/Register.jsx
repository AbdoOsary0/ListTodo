"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpHandler } from "../../../../firebase/auth"; // Adjust the import path as needed
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpHandler(email, firstName, lastName, password, setError, router); // Pass router to signUpHandler
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <label>
          <h2>First Name:</h2>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </label>
        <label>
          <h2>Last Name:</h2>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </label>
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
        <button type="submit" className="btn-primary">
          Sign Up
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      <Link href={"/account/Login"}>I already Have Account</Link>
    </div>
  );
};

export default SignUp;
