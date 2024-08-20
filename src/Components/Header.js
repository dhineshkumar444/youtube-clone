import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { Link } from "react-router-dom";
import { searchSuggestion } from "../utils/suggestionSearch";




const Header = () => {
  const dispatch = useDispatch();
  const isMenuOpen  = useSelector((store)=> store.app.isMenuOpen)

  const toggleHamburger = () => {
  
    dispatch(toggleMenu());
  };
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [Onfocus, setOnfocus] = useState(false);
  const searchCache = useSelector((store)=> store.search)
const cache = searchCache[search]
  useEffect(() => {
    const fetchSearchSuggestions = async () => {
      try {
        const response = await fetch(
          `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${search}`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data[1]);
          dispatch(cacheResults({[search]:data[1]}))
          
        } else {
          
        }
      } catch (error) {
        
      }
    };

    if (search) {
      const makeApiCall = setTimeout(() =>{
        if(cache){
          setSuggestions(cache);
        }
        else{
          fetchSearchSuggestions();
          
        }
        
      } , 200);
      return () => {
        clearTimeout(makeApiCall);
      };
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const handelChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };
  const handleSuggestion = (val)=>{
setSearch(val);
setOnfocus(false)
dispatch(searchSuggestion(search))
  }

  const handleSearchButton =()=>{
dispatch(searchSuggestion(search))
setOnfocus(false)

    
  }
  return (
    <div className="w-full flex justify-between items-center border-gray-100 border-b-2 px-3 shadow-lg max-h-20 relative max-sm:px-1">
      <div className="flex w-1/4">
        <img className={`${!isMenuOpen?"transform rotate-90 transition duration-500":"transform rotate-0 transition duration-500"}`}
          src="https://icon-library.com/images/hamburger-menu-icon-png-white/hamburger-menu-icon-png-white-15.jpg"
          alt="hamburger Icon"
          height={30}
          width={70}
          onClick={toggleHamburger}
        />
       
        <img
          className="max-md:hidden"
          src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-0.png"
          alt="app logo"
          width={100}
          height={20}
        />
       
      </div>
      <div className="flex  w-2/4  relative">
        <div className="flex justify-center relative w-3/4">
          <input
            type="text"
            className="outline-none border w-full border-gray-400 p-2 rounded-s-full"
            placeholder="Search Videos..."
            value={search}
            onChange={(e) => handelChange(e)}
            onFocus={() => setOnfocus(true)}
          />
          <button className="border border-gray-400 py-2 px- max-md:px-2 md:px-5 bg-gray-100 rounded-e-full" onClick={handleSearchButton}>
            🔍
          </button>
        </div>
        {suggestions.length > 0 && Onfocus && (
          <div className="absolute bg-white border border-gray-300 w-full mt-1 top-10 rounded-lg shadow-lg z-10">
            {suggestions.map((val, index) => (
              <p
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={()=>handleSuggestion(val)} >
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
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default Header;
