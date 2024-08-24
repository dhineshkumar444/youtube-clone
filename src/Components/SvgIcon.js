import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import  { searchSuggestion } from '../utils/suggestionSearch';

const SvgIcon = ({ svg, name }) => {
  const dispatch = useDispatch();
  const feature = (name)=>{
    dispatch(searchSuggestion(name))
  }
    
    return (
      <div className="flex items-center gap-5 py-2 px-3 hover:bg-gray-100 hover:rounded-lg cursor-pointer" onClick={()=>feature(name)}>
        
        
         <img src={svg} />
        <p className="font-bold">{name} </p>
      </div>
    );
  };

export default SvgIcon