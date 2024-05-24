"use client";
import React, { ChangeEvent } from "react";

type FilterProps = {
  handleRadioFilter: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FilterRadioButton({ handleRadioFilter }: FilterProps) {
  return (
    <div className="flex md:table-cell md:mx-auto md:ms-auto">
      <div>
        <input
          type="radio"
          id="all"
          name="tag_filter"
          value=""
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="all">
          <img src="./all.png" alt="all" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="health"
          name="tag_filter"
          value="health"
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="health">
          <img src="./health.png" alt="health" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="education"
          name="tag_filter"
          value="education"
          onChange={handleRadioFilter}
        ></input>
        <label className=" rounded-label" htmlFor="education">
          <img src="./education.png" alt="education" />
        </label>
      </div>

      <div>
        <input
          type="radio"
          id="cancer"
          name="tag_filter"
          value="cancer"
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="cancer ">
          <img src="./cancer.png" alt="cancer" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="israel-palestine"
          name="tag_filter"
          value="israel-palestine"
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="israel-palestine">
          <img src="./israel-palestine.png" alt="israel-palestine" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="ukraine"
          name="tag_filter"
          value="ukraine"
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="ukraine">
          <img src="./ukraine.png" alt="ukraine" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="poverty"
          name="tag_filter"
          value="poverty"
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="poverty">
          <img src="./poverty.png" alt="poverty" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="food-security"
          name="tag_filter"
          value="food-security"
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="food-security">
          <img src="./food_security.png" alt="food_security" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="adoption"
          name="tag_filter"
          value="adoption"
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="adoption">
          <img src="./adoption.png" alt="adoption" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="autism"
          name="tag_filter"
          value="autism"
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="autism ">
          <img src="./autism.png" alt="autism" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="disabilities"
          name="tag_filter"
          value="disabilities"
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="disabilities">
          <img src="./disabilities.png" alt="disabilities" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="refugees"
          name="tag_filter"
          value="refugees"
          onChange={handleRadioFilter}
        ></input>
        <label className="rounded-label" htmlFor="refugees">
          <img src="./refugees.png" alt="refugees" />
        </label>
      </div>
    </div>
  );
}
