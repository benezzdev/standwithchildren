"use client";
import UserFavouriteList from "@/components/UserFavouriteList";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Fundraiser from "../fundraiser/page";

export default function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<FundraiserData[] | null>(null);
  // const { logout } = useAuth();
  const nonprofit = process.env.NEXT_PUBLIC_NONPROFIT_ID;

  const fetchFundRaisers = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const graphql = JSON.stringify({
      query:
        "query Fundraisers {\r\n  fundraisers {\r\n    author {\r\n      email\r\n      username\r\n    }\r\n    fundraiser\r\n  }\r\n}",
      variables: {},
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow" as RequestRedirect,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/graphql",
        requestOptions
      );
      setIsLoading(true);
      if (response.ok) {
        const result = await response.json();
        // console.log("fundRaisers ids :>> ", result);
        const ids = result.data.fundraisers.map((fundraiser: Fundraiser) => {
          //console.log("fundraiser :>> ", fundraiser);
          return fundraiser.fundraiser;
        });
        setIsLoading(false);
        fetchSingleFundRaisers(ids);
      }
      if (!response.ok) {
        const result = await response.json();
        console.log("result :>> ", result);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    fetchFundRaisers();
  }, []);

  //FETCH SINGLE FUNDRAISERS
  function fetchSingleFundRaisers(fundraisersIds: string[]) {
    console.log(fundraisersIds);
    const fetches = fundraisersIds.map((id) => {
      return fetch(
        `https://partners.every.org/v0.2/nonprofit/${nonprofit}/fundraiser/${id}`
      );
    });
    Promise.all(fetches)
      .then((result) => {
        console.log("result from promise all fundraisers:>> ", result);
        const jsons = result.map((response) => {
          return response.json();
        });
        Promise.all(jsons).then((data) => {
          console.log("data from promises of funds :>> ", data);
          setData(data);
        });
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }

  if (isLoading) return <p>Loading...</p>;
  if (!isLoading && !data) return <p>No profile data</p>;

  return (
    <div>
      <h1>Account</h1>
      <h1 className="text-3xl m-3">
        List of my fundraisers: *to edit or delete funraisers please contact us*
      </h1>
      <div className="lg:flex lg:flex-wrap lg:justify-center ">
        {data &&
          data.map((fund, i) => {
            return (
              <div
                key={i}
                className="flex flex-wrap lg:w-1/3 lg:rounded-xl rounded-xl shadow-xl lg:shadow-xl border lg:border p-3 m-3"
              >
                <div className="w-full">
                  <h4 className="text-2xl">{fund.data.fundraiser.title}</h4>

                  <div className="h-48 lg:h-auto lg:w-full lg:w-48 lg:h-auto flex-none bg-cover rounded text-center overflow-hidden">
                    {fund.data.nonprofits.map((nonprofit, i) => {
                      return (
                        <Link
                          key={i}
                          href={`https://www.every.org/${nonprofit.id}/f/${fund.data.fundraiser.id}`}
                          target="_blank"
                        >
                          <img
                            src={
                              "https://res.cloudinary.com/everydotorg/image/upload/f_auto,c_limit,w_3840,q_80/" +
                              nonprofit.coverImageCloudinaryId
                            }
                          ></img>
                          <div className="flex justify-start my-1">
                            <p>{"Charity name: " + nonprofit.name}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="text-xl my-1">
                    <p>
                      {"Goal amount:" + fund.data.fundraiser.goalAmount + " "}
                      {fund.data.fundraiser.goalCurrency}
                    </p>
                  </div>
                  <p>{fund.data.fundraiser.description}</p>
                </div>
              </div>
            );
          })}
      </div>
      <UserFavouriteList />
    </div>
  );
}
