
import { createContext, useState } from 'react';
import './App.css';
import Body from './Components/Body';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import {Provider} from "react-redux"
import store from './utils/store';
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom"
import VideoWatchPage from './Components/VideoWatchPage';
import MainContainer from './Components/MainContainer';
import SearchPage from './Components/SearchPage';




const appRouter = createBrowserRouter([{
  path:"/",
  element:(<><Header /><Body /></>),
  children:[{
    path:"/watch",
    element:<VideoWatchPage />
  },
  {
    path:"/search",
    element:<SearchPage />
  },
  {
    path:"/",
    element:<MainContainer />
  },
]

}])
function App() {


 
  return (
    
   
    <div className='overflow-x-hidden'>
      <Provider store={store} >
    
      
      
      <RouterProvider router={appRouter}> 
   
      </RouterProvider>
      
      </Provider >
     
    </div>
  );
}

export default App;
