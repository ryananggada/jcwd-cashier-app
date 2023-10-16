import React from "react";
import { PiCoffee, PiHamburgerDuotone, PiCookie } from "react-icons/pi";
import { IoPricetag } from "react-icons/io5";

export default function KitchenMenu() {
  return (
    <>
      <section>
        <div className="justify-evenly flex">
          <button className="rounded-lg text-[#01AB52] bg-white border border-[#01AB52] p-1 justify-evenly flex">
            <PiCoffee />
            <span> Drinks</span>
          </button>
          <button className="rounded-lg text-[#01AB52] bg-white border border-[#01AB52] p-1 justify-evenly flex">
            <PiHamburgerDuotone />
            <span>Food</span>
          </button>
          <button className="rounded-lg text-[#01AB52] bg-white border border-[#01AB52] p-1 justify-evenly flex">
            <PiCookie />
            <span> Snacks</span>
          </button>
          <button className="rounded-lg text-[#01AB52] bg-white border border-[#01AB52] p-1 justify-evenly flex">
            <IoPricetag />
            <span> Combo</span>
          </button>
        </div>
      </section>
    </>
  );
}
