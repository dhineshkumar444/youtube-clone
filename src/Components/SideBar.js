import React, { useContext, useState } from "react";
import home from "../Images/home.png";
import shorts from "../Images/icons8-youtube-shorts-24.png";
import subscription from "../Images/subscription-icon-removebg-preview.png";
import SvgIcon from "./SvgIcon";
import {Explore, MoreFromYoutube} from "../utils/sideBarSVG"
import { clickContext } from "../App";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
 
  const isMenuOpen  = useSelector((store)=> store.app.isMenuOpen)
if(isMenuOpen){
  return null
}
  return (
    <div className={`border-2 border-gray-100 shadow-xl h-lvh overflow-y-auto px-2 pr-5 pt-5 z-10  w-1/6 max-lg:w-2/6 max-sm:w-full`}>
     <Link to="/">
     <div className="flex items-center gap-5 py-2 hover:bg-gray-100 hover:rounded-lg">
        <img src={home} width={20} />
        <p className="font-bold">Home</p>
      </div>
      </Link> 
      <div className="flex items-center gap-5 py-2  hover:bg-gray-100 hover:rounded-lg">
        <img src={shorts} width={20} />
        <p className="font-bold">Shorts</p>
      </div>

      <div className="flex items-center gap-5 py-2  hover:bg-gray-100 hover:rounded-lg">
        <img src={subscription} width={20} />
        <p className="font-bold">Subscriptions</p>
      </div>

      <div className=" border-b-2 border-gray-100 pb-4">
        <h1 className="font-bold my-2"></h1>
      
     {
        Explore.map((icon, index)=>{
            return <SvgIcon key={index} svg={icon.svg} name={icon.name} />

        })
     }
    
      </div>
      <div className=" border-b-2 border-gray-100 pb-4">
        <h1 className="font-bold my-2" ></h1>  
     {
        MoreFromYoutube.map((icon, index)=>{
            return <SvgIcon key={index} svg={icon.svg} name={icon.name} />
        })
     }
    
      </div>

      <div className="p-3">
        <h3 className="text-lg font-bold text-gray-400">Credits</h3>
        <p className="text-sm text-slate-400 py-2">Powered By Dhinesh Kumar S - Frontend Developer</p>
        <p className="text-sm text-slate-400 py-2">Copyright@ dhinesh270521@gmail.com</p>
        
      </div>
      
      
    </div>
  );
};

export default SideBar;
