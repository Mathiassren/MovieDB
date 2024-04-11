import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiSearch, FiCalendar } from "react-icons/fi";

const Nav = () => {
  return (
    <nav className="bg-light-grey h-16 fixed text-white bottom-0 left-0 right-0 bg-[#41403E]">
      <ul className="flex justify-between p-6 items-center h-16">
        <li>
          <NavLink to="/mainpage">
            <span className="iconBorder flex items-center justify-center border-2 border-white rounded-full w-10 h-10">
              <FiHome className="text-2xl" />
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">
            <span className="iconBorder flex items-center justify-center border-2 border-white rounded-full w-10 h-10">
              <FiSearch className="text-2xl" />
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Calendar">
            <span className="iconBorder flex items-center justify-center border-2 border-white rounded-full w-10 h-10">
              <FiCalendar className="text-2xl" />
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
