import React, { useState } from 'react'

const SvgIcon = ({ svg, name }) => {

    
    return (
      <div className="flex items-center gap-5 py-2" >
        <div 
          dangerouslySetInnerHTML={{ __html: svg }}
          
        />
        { <p className="font-bold">{name}</p>}
      </div>
    );
  };

export default SvgIcon