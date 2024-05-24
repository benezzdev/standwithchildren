"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Card from "../../components/Card";
import Search from "../../components/Search";
import FilterRadioButton from "../../components/FilterRadioButton";

export default function Charities() {
  const [charities, setCharities] = useState<CharityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getCharities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://partners.every.org/v0.2/search/:children?apiKey=${apiKey}&take=50`
      );
      if (response.ok) {
        console.log("response", response);
        const data = await response.json();
        console.log("data", data);
        setCharities(data.nonprofits);
        setIsLoading(false);
        return;
      }
      console.log("response not ok", response);
    } catch (error) {
      console.log("error :>>", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const searchedCharities = charities.filter((charity) => {
    return charity.name.toLowerCase().includes(inputText.toLowerCase());
  });

  const handleRadioFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };

  const filteredCharities = searchedCharities.filter((charity, i) => {
    if (radioValue == "") {
      return searchedCharities;
    } else {
      return charity.tags && charity.tags.includes(radioValue);
    }
  });

  useEffect(() => {
    getCharities();
  }, []);

  return (
    <div>
      <span>
        <Search handleInputChange={handleInputChange} />
      </span>
      <div className="grid grid-cols-1 grid-rows-1 md:flex md:justify-center gap-5 gap-y-5 px-5 lg:px-5 md:mt-2">
        <div className="overflow-x-auto lg:h-fit lg:pb-5 h-30 md:h-auto md:flex md:w-2/4 md:rounded-xl md:shadow-xl md:border">
          <FilterRadioButton handleRadioFilter={handleRadioFilter} />
        </div>
        <div>
          <p className="text-2xl text-slate-500 font-bold pb-5">
            List of {filteredCharities.length} children charities
          </p>

          {charities &&
            filteredCharities.map((charity: CharityData, i) => {
              return (
                <div key={i}>
                  <Card charity={charity} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
