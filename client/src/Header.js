import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Header() {
  const [ { basket, user }, dispatch ] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      localStorage.removeItem("token");
      dispatch({
        type: "SET_USER",
        user: null
      });
      dispatch({
        type: "EMPTY_BASKET"
      })
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo" // Added alt attribute
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__SearchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello, {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to={user ? "/orders" : "/login"}>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>{" "}
          {/* Fixed extra space */}
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to={user ? "/checkout" : "/login"}>
          <div className="header__optionBasket">
            <ShoppingCartOutlinedIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
