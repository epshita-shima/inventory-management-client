/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/user/userSlice";
import NavbarItem from "../../components/NavbarItem";
import Dropdown from "../../components/DynamicDropdown";

const Navbar = ({ data }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log(data)
//   const handleSignOut = async () => {
//     try {
//       await signOut(auth).then(() => {
//         dispatch(setUser(null));
//         navigate("/login");
//       });
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav">
        {data?.map((item, index) => (
          <Dropdown key={index} item={item} isRight={index % 2 === 0} />
        // <NavbarItem key={index} item={item}></NavbarItem>
        ))}
      </ul>

    </div>
   {/* {user?.email ? (
    <div class="d-flex">
      <button
        class="btn btn-outline-success"
        onClick={() => {
          handleSignOut();
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    ""
  )} */}
  </nav>
  );

  
};
export default Navbar;
