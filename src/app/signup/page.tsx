"use client";
import { useAuth } from "@/components/context/AuthContext";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SIGNUP } from "../api/graphql/mutations";

const SignUp = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [submit, { loading, error }] = useMutation(SIGNUP, {
    variables: { email: email, username: username, password: password },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // here i would validate inputValues before submitting
    console.log("validating pass");
    if (password !== repeatedPassword) {
      alert("Passwords don't match");
    } else {
      const result = await submit();
      console.log("this is the result", result);
      if (result.data) {
        console.log("result.data :>> ", result.data);
        setUser(result.data.signUp);
        router.push("/");
      }
    }
  };

  return (
    <div className="bg-white flex flex-col items-center pt-4">
      <div className="text-4xl">
        <h1>SignUp</h1>
      </div>
      <div className="mt-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <label htmlFor="fname">Email</label>
          </div>
          <input
            className="rounded-full border-green-300 border-solid border-2 p-1"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <div className="flex flex-col items-center">
            <label htmlFor="fname">Username</label>
          </div>
          <input
            className="rounded-full border-green-300 border-solid border-2 p-1"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <div className="flex flex-col items-center">
            <label htmlFor="fname">Password</label>
          </div>
          <input
            className="rounded-full border-green-300 border-solid border-2 p-1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="flex flex-col items-center">
            <label htmlFor="fname">Repeat password</label>
          </div>
          <input
            className="rounded-full border-green-300 border-solid border-2 p-1"
            type="password"
            placeholder="Repeat password"
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
          ></input>
          <div className="flex flex-col items-center pt-2 ">
            <button
              type="submit"
              className="bg-green-400 rounded-full px-5 py-1"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div className="pt-2 ps-1">
        <p>
          Already have an account?
          <Link className="px-1.5 text-green-400" href={"/signin"}>
            Signin
          </Link>
          here
        </p>
      </div>
    </div>
  );
};

export default SignUp;
