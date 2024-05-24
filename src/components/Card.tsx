import Link from "next/link";
import Favourites from "./Favourites";
import { useEffect, useState } from "react";

export default function Card({ charity }: CharityInfo) {
  return (
    <div key={charity.ein}>
      <div className="w-full lg:max-w-full lg:flex border-black">
        <Link
          key={charity.ein}
          href={`/charities/${charity.ein}`}
          className="h-48 lg:h-auto w-full lg:w-48 flex-none bg-cover rounded text-center overflow-hidden"
        >
          <img
            className="h-48 lg:h-auto w-full lg:w-48 flex-none bg-cover rounded text-center overflow-hidden"
            src={charity.coverImageUrl}
            title="Charity cover image"
          ></img>
        </Link>
        <div className=" bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <Link key={charity.ein} href={`/charities/${charity.ein}`}>
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">
                {charity.name}
              </div>
              <p className="text-gray-700 text-base">{charity.description}</p>
            </div>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <Link key={charity.ein} href={`/charities/${charity.ein}`}>
                <div className="flex ">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={charity.logoUrl}
                    alt="Avatar of Jonathan Reinink"
                  ></img>
                  <div className="flex items-center text-sm">
                    <p className="text-gray-900 leading-none">
                      {charity.location}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <Favourites ein={charity.ein} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
