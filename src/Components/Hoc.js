import React from 'react'
 import VideoCard from './VideoCard'

const Hoc = ({data}) => {

  
        return (

            <div>
                <h1>From Hoc</h1>
                <VideoCard data={data}/>
            </div>
          )
    }


export default Hoc