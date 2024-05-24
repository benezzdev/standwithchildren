"use client";
import { ADDTOFAVOURITE } from "@/app/api/graphql/mutations";
import { useAuth } from "@/components/context/AuthContext";
import { useMutation } from "@apollo/client";
import { HeartIcon as EmptyHeart } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/16/solid";

declare type FavouriteProps = {
  ein: string;
};

const Favourites = ({ ein }: FavouriteProps) => {
  const { user, favouritesIds, setFavouritesIds } = useAuth();
  //console.log("ein :>> ", ein);

  const [submit, { loading, error }] = useMutation(ADDTOFAVOURITE, {
    variables: { favourite: ein },
  });

  const buttonType = favouritesIds.includes(ein) ? (
    <FilledHeart className="size-8 text-red-500" />
  ) : (
    <EmptyHeart className="size-8" />
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      alert("Login please");
    } else {
      const result = await submit();
      //console.log("this is the result", result);
      if (result.data) {
        setFavouritesIds((prev) => {
          const isFavourite = prev.includes(ein);
          if (isFavourite) {
            return prev.filter((id) => {
              return id !== ein;
            });
          } else {
            return [...prev, ein];
          }
        });
        console.log("results after hitting favv icon :>> ", result.data);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit">{buttonType}</button>
        </div>
      </form>
    </div>
  );
};
export default Favourites;
