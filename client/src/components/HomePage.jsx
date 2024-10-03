import React, {useRef, useState} from 'react';


function HomePage(){
  
  return (
      <>
        <div className="flex flex-col items-stretch font-poppins bg-custom-gradient h-screen">
          <div className="bg-topbarpink w-full flex justify-between items-center text-white drop-shadow-topbar">
            <div className="flex items-center space-x-4">
              <div className="text-[36px] mb-0.5 ml-1">Rizzy</div>
              <button className="bg-transparent hover:bg-pink-500">About</button>
              <button className="bg-transparent hover:bg-pink-500">Products</button>
              <button className="bg-transparent hover:bg-pink-500">Contact Us</button>
            </div>
            <button className="bg-transparent hover:bg-pink-500">Log In</button>
          </div>
          <div className="flex flex-col items-center grow justify-center">
            <div className="slogan text-3xl mb-10 font-pacifico text-[48px] text-white drop-shadow-slogan">Get your rizz up</div>
            <button className="createaccount bg-transparent text-white px-6 py-3 rounded-full hover:bg-pink-500 border-white">Create
              account
            </button>
          </div>
        </div>
      </>
  )
}

export default HomePage;