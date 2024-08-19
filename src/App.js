
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


export const clickContext = createContext();

const appRouter = createBrowserRouter([{
  path:"/",
  element:<Body />,
  children:[{
    path:"/watch",
    element:<VideoWatchPage />
  },
  {
    path:"/",
    element:<MainContainer />
  },
]

}])
function App() {


 
  return (
    
   
    <div className=''>
      <Provider store={store} >
     
      <Header />
      
    <RouterProvider router={appRouter} />
      </Provider >
     
    </div>
  );
}

export default App;
