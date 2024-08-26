import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { searchMostPopular, searchSuggestion } from "../utils/suggestionSearch";
import { updateSearch } from "../utils/searchResultSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const toggleHamburger = () => {
    dispatch(toggleMenu());
  };

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [onFocus, setOnFocus] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const cache = searchCache[search];

  useEffect(() => {
    const fetchSearchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${search}`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data[1]);
          dispatch(cacheResults({ [search]: data[1] }));
        }
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    if (search) {
      const makeApiCall = setTimeout(() => {
        if (cache) {
          setSuggestions(cache);
        } else {
          fetchSearchSuggestions();
        }
      }, 200);
      return () => {
        clearTimeout(makeApiCall);
      };
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSuggestion = (val) => {
    
    setSearch(val);
 
  };

  const handleSearchButton = () => {
    dispatch(searchSuggestion(search));
    dispatch(updateSearch(search));
    setOnFocus(false);
    navigate(`/search?search_query=${search.split(" ").join("+")}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search) {
      handleSearchButton();
    }
  };
  const feature =()=>{
    alert("Feature implementation is ongoing. Please check later.")
  }

  return (
    <div className="w-full flex justify-between items-center border-gray-100 border-b-2 px-3 shadow-lg max-h-20 relative max-sm:px-1">
      <div className="flex w-1/4">
        <img
          className={`${
            !isMenuOpen
              ? "transform rotate-90 transition duration-500"
              : "transform rotate-0 transition duration-500"
          }`}
          src="https://icon-library.com/images/hamburger-menu-icon-png-white/hamburger-menu-icon-png-white-15.jpg"
          alt="hamburger Icon"
          height={30}
          width={70}
          onClick={toggleHamburger}
        />
        <div>
          <Link to={"/"}>
            <img
              title="Home"
              className="max-md:hidden"
              src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-0.png"
              alt="app logo"
              width={100}
              height={20}
              onClick={() => dispatch(searchMostPopular())}
            />
          </Link>
        </div>
      </div>
      <div className="flex w-2/4 relative">
        <div className="flex justify-center relative w-4/5 max-lsm:w-full">
          <input
            type="text"
            className="outline-none border w-full border-gray-400 p-2 rounded-s-full"
            placeholder="Search Videos..."
            value={search}
            onChange={(e) => handleChange(e)}
            onFocus={() => setOnFocus(true)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
       
            <button
              className={`border border-gray-400 py-2 px- max-md:px-2 md:px-5 bg-gray-100 rounded-e-full ${
                search ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={handleSearchButton}
            >
              🔍
            </button>
    
        </div>
        {suggestions.length > 0 && onFocus && (
          <div className="absolute bg-white border border-gray-300 w-4/5 max-lsm:w-full mt-1 top-10 rounded-lg shadow-lg z-10">
            {suggestions.map((val, index) => (
              <p
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestion(val)}
              >
                {val}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/4 flex justify-end max-sm:justify-center">
        <img
          src="https://tse3.mm.bing.net/th?id=OIP.w2McZSq-EYWxh02iSvC3xwHaHa&pid=Api&P=0&"
          alt="user-logo"
          width={30}
          height={30}
          onClick={feature}
        />
      </div>
    </div>
  );
};

export default Header;
