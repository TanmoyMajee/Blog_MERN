import React from 'react'
// import {} form 
import {Outlet} from 'react-router-dom'
import Header from './header'
import Footer from './footer'
function layout() {
  return (
   <>
<div className="flex flex-col min-h-screen bg-slate-500">
      <Header />
      <div className="flex-grow">
        <Outlet /> {/* This will render the nested routes */}
      </div>
      <Footer />
    </div>
   </>
  )
}

export default layout