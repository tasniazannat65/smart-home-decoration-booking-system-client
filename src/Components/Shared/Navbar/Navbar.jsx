import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import MyLink from "./MyLink";
import Container from "../Container/Container";
import Button from "../Button/Button";
import logoImg from "../../../assets/logo.png";
import useAuth from "../../../Hooks/useAuth";
import { BiLogOut } from "react-icons/bi";
import { BsMoon, BsSun } from "react-icons/bs";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  },[theme]);



  return (
    <div className="bg-base-200 fixed left-0 w-full z-50 border-b border-base-300">
      <Container>
        <div className="navbar">
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <img src={logoImg} alt="Brand Logo" className="w-16 h-16" />
              <div className="flex flex-col leading-tight">
                <Link to="/">
                  <p className=" font-bold text-[16px] sm:text-[17px] md:text-lg lg:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ">
                    Laxius Decor
                  </p>
                </Link>
                <p className="text-sm text-neutral font-medium -mt-1">
                  Design Beyond Ordinary
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 lg:gap-2">
            <button
            onClick={()=> setTheme(theme === 'light' ? 'dark' : 'light')}
            className="bgn btn-ghost btn-circle"
            aria-label="Toggle Theme"
            >
              {
                theme === 'light' ? (
                  <BsMoon className="text-xl text-neutral"/>
                ) : (
                  <BsSun className="text-xl text-warning"/>
                )
              }

            </button>
         

            {user ? (
              <div className=" dropdown dropdown-end  z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 border-2 border-base-300 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      referrerPolicy="no-referrer"
                      src={
                        user.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                >
                  <div className=" pb-3 border-b border-b-base-200 space-y-2">
                    <li className="text-sm font-bold text-primary text-center">
                      {user.displayName}
                    </li>
                    <li className="text-xs text-neutral text-center">
                      {user.email}
                    </li>
                  </div>

                  <ul>
                    <li className=" text-accent font-semibold text-xl">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                  </ul>

                  <li>
                    <button
                      onClick={signOutUser}
                      className="btn bg-base-100 border-2 text-[16px] font-medium border-secondary text-secondary"
                    >
                      <BiLogOut />
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <Button outline label="Login" />
              </Link>
            )}

            <div className="flex items-center">
              <Link to="/sign-up">
                <Button label="Sign Up" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
