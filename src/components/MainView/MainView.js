import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import Footer from '../../pages/Footer/Footer'

const MainView = ({singleUserData, setSingleUserData}) => {
  return (
    <div style={{position:'absolute',top:'10%'}}>
      <Home singleUserData={singleUserData} setSingleUserData={setSingleUserData}></Home>
      
      <Footer />
    </div>
  )
}

export default MainView
