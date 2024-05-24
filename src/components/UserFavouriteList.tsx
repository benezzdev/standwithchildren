"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Favourites from "./Favourites";

const UserFavouriteList = () => {
  const [data, setData] = useState<FavouriteCharity[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  //const [ids, setIds] = useState<string[]>([]);
  //console.log("favourites", data);

  //embedding ein saved as favourites to fetch charities from rest API
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchFavourites = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const graphql = JSON.stringify({
      query:
        "query Favourites {\r\n  favourites {\r\n    _id\r\n    favourite\r\n    author {\r\n      _id\r\n      email\r\n      username\r\n    }\r\n  }\r\n}",
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
      setLoading(true);
      if (response.ok) {
        const result = await response.json();
        // console.log("favourite ids :>> ", result);
        const ids = result.data.favourites.map((favourite: Favourite) => {
          return favourite.favourite;
        });
        setLoading(false);
        //setIds(ids);
        fetchSingleCharites(ids);
      }
      if (!response.ok) {
        const result = await response.json();
        //console.log("result :>> ", result);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    fetchFavourites();
  }, []);

  //FETCH SINGLE CHARITIES
  function fetchSingleCharites(ids: string[]) {
    //console.log(ids);
    const fetches = ids.map((id) => {
      return fetch(
        `https://partners.every.org/v0.2/nonprofit/${id}?apiKey=${apiKey}`
      );
    });
    Promise.all(fetches)
      .then((result) => {
        //console.log("result from promise all:>> ", result);
        const jsons = result.map((response) => {
          return response.json();
        });
        Promise.all(jsons).then((data) => {
          //console.log("data from promises :>> ", data);
          setData(data);
        });
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="m-3">
      <div className="text-3xl m-3">
        <p>My favourites list</p>
      </div>
      <div className="lg:flex lg:flex-wrap lg:justify-center ">
        {data &&
          data.map((charity) => {
            return (
              <div
                key={charity.data.nonprofit.ein}
                className="inline-block lg:flex lg:flex-wrap lg:w-1/4 lg:rounded-xl rounded-xl shadow-xl lg:shadow-xl border lg:border lg:p-3 lg:m-3 my-2"
              >
                <Link
                  key={charity.data.nonprofit.ein}
                  href={`/charities/${charity.data.nonprofit.ein}`}
                  className="lg:flex lg:flex-wrap h-48 lg:h-auto w-full lg:w-full lg:flex-wrap bg-cover rounded text-center overflow-hidden"
                >
                  <img
                    className="flex h-48 lg:h-auto w-full lg:w-full  bg-cover rounded items-center overflow-hidden"
                    src={charity.data.nonprofit.coverImageUrl}
                    title="charity.data.nonprofit cover image"
                  ></img>
                </Link>
                <div className=" bg-white rounded-b lg:rounded-b-none lg:rounded-r pt-2 flex flex-col justify-between leading-normal">
                  <Link
                    key={charity.data.nonprofit.ein}
                    href={`/charities/${charity.data.nonprofit.ein}`}
                  >
                    <div className="flex flex-wrap mb-8">
                      <div className="text-gray-900 font-bold text-xl mb-2">
                        {charity.data.nonprofit.name}
                      </div>
                      <p className="flex lg:flex-wrap text-gray-700 text-base">
                        {charity.data.nonprofit.description}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <div className="lg:me-56">
                    <img
                      className=" w-12 h-12 rounded-full "
                      src={charity.data.nonprofit.logoUrl}
                      alt="logo"
                    ></img>
                  </div>
                  <div>
                    <Favourites ein={charity.data.nonprofit.ein} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default UserFavouriteList;
