"use client";
import { useAuth } from "@/components/context/AuthContext";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LOGIN } from "../api/graphql/mutations";

const Signin = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submit, { loading, error }] = useMutation(LOGIN, {
    variables: { email: email, password: password },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // here i would validate inputValues before submitting
    const result = await submit();
    if (result.data) {
      setUser(result.data.login);
      router.push("/");
    }
  };

  return (
    <div className="bg-white flex flex-col items-center pt-4">
      <div className="text-4xl">
        <h1>Signin</h1>
      </div>
      <div className="mt-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <label htmlFor="fname">Email</label>
          </div>
          <input
            className="rounded-full border-green-400 border-solid border-2 p-1"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <div className="flex flex-col items-center">
            <label htmlFor="fname">Password</label>
          </div>
          <input
            className="rounded-full border-green-400 border-solid border-2 p-1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="flex flex-col items-center pt-2 ">
            <button
              type="submit"
              className="bg-green-400 rounded-full px-5 py-1"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="pt-2 ps-1">
          <p>
            New here?
            <Link className="px-1.5 text-green-400" href={"/signup"}>
              SignUp
            </Link>
            instead
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
