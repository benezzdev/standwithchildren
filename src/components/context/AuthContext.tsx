"use client";

import { logoutCookie } from "@/actions/logout";
import { gql, useQuery } from "@apollo/client";
import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type getMeRes = {
  getMe: User;
};

interface AuthContext {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  logout: () => void;
  favouritesIds: string[];
  setFavouritesIds: React.Dispatch<SetStateAction<string[]>>;
}

const AuthContext = createContext({} as AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [favouritesIds, setFavouritesIds] = useState<string[]>([]);

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

      if (response.ok) {
        const result = await response.json();
        //console.log("favourite ids :>> ", result);
        const ids = result.data.favourites.map((favourite: Favourite) => {
          return favourite.favourite;
        });
        setFavouritesIds(ids);
      }
      if (!response.ok) {
        const result = await response.json();
        //console.log("result :>> ", result);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const logout = () => {
    setUser(null);
    logoutCookie();
    router.push("/");
  };

  // NOTE how to make the active user state persist?
  const getMeQuery = gql`
    query getMe {
      getMe {
        _id
        email
        username
      }
    }
  `;

  const { data } = useQuery<getMeRes>(getMeQuery);

  useEffect(() => {
    if (data) {
      setUser(data.getMe);
      fetchFavourites();
    }
  }, [data]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, favouritesIds, setFavouritesIds }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
