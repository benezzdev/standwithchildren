"use client";
import { useAuth } from "@/components/context/AuthContext";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FUNDRAISER } from "../api/graphql/mutations";
import { useRouter } from "next/navigation";

const Fundraiser = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");

  const [submit, { loading, error }] = useMutation(FUNDRAISER, {
    update: (result) => {
      console.log("mutationResult: ", result);
    },
    variables: {
      title: title,
      description: description,
      goal: goal,
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handling submit");

    console.log("validating user");
    if (!user) {
      alert("Log in please");
    } else if (!title || !description || !goal) {
      alert("All fields must be filled!");
    } else {
      const result = await submit();
      console.log("this is the result", result);
      if (result.data) {
        console.log("result.data :>> ", result.data);
        router.push("/account");
      }
    }
  };

  return (
    <div className="bg-white flex flex-col items-center pt-4">
      <div className="text-4xl">
        <h1>Create Your Fundraiser</h1>
      </div>
      <div className="mt-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <label htmlFor="fname">Title</label>
          </div>
          <input
            className="rounded-full border-green-300 border-solid border-2 p-1"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <div className="flex flex-col items-center">
            <label htmlFor="fname">Goal ($ USD)</label>
          </div>
          <input
            className="rounded-full border-green-300 border-solid border-2 p-1"
            type="number"
            placeholder="Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          ></input>

          <label htmlFor="message" className="flex flex-col items-center">
            Your message
          </label>
          <textarea
            id="message"
            rows={6}
            className="w-full rounded-md border-green-300 border-solid border-2 p-1"
            placeholder="Write your fundraiser description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="flex flex-col items-center pt-2 ">
            <button
              type="submit"
              className="bg-green-400 rounded-full px-5 py-1"
            >
              Create Fundraiser
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Fundraiser;
