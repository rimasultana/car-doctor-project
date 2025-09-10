import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  const navMenu = () => {
    return (
      <>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/About"}>About</Link>
        </li>
        <li>
          <Link href={"/services"}>Services</Link>
        </li>
        <li>
          <Link href={"/blog"}>Blog</Link>
        </li>
        <li>
          <Link href={"/contact"}>Contact</Link>
        </li>
      </>
    );
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navMenu()}
            </ul>
          </div>
          <Link href={"/"} className=" text-xl">
            <div className="flex flex-col">
              <Image
                src={"/assets/images/logo.svg"}
                width={80}
                height={80}
                alt="logo"
              />
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navMenu()}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn text-[#FF3811] border-2 border-[#FF3811]">Appointment</a>
        </div>
      </div>
    </div>
  );
}
