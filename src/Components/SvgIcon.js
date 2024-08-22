import React, { useState } from 'react'

const SvgIcon = ({ svg, name }) => {
  const feature =()=>{
    alert("Feature implementation is ongoing. Please check later.")
  }
    
    return (
      <div className="flex items-center gap-5 py-2  hover:bg-gray-100 hover:rounded-lg" onClick={feature}>
        <div 
          dangerouslySetInnerHTML={{ __html: svg }}
          
        />
        { <p className="font-bold">{name} </p>}
      </div>
    );
  };

export default SvgIcon