import React from 'react'
import Home from '../Home/Home'
import Footer from '../Footer/Footer'

const MainView = ({singleUserData,setSingleUserData}) => {
  return (
    <div className='row' style={{position:'relative'}}>
        <div style={{position:'absolute'}}>
        <Home singleUserData={singleUserData} setSingleUserData={setSingleUserData}></Home>
        </div>
     
    <div style={{position:'absolute',bottom:'0'}}>
    <Footer></Footer>
    </div>
    </div>
  )
}

export default MainView
