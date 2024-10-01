import React from 'react'
import Topnav from "./topnav";
import Image from "next/image";
import CrytoCoinWatch from './CrytoCoinWatch';
const Header = () => {
  return (
    <div>
      <Topnav/>
     <div className="flex justify-center align-middle pl-6">
      <div className="relative">
      <Image src="/images/bg.webp" alt="bg" className="opacity-30" height={66} width={285}/>
      <p className=" text-custom-green text-xs bg-center absolute left-20 top-6">CRYPTO INVESTMENTS</p>
      </div>
     </div>
     <CrytoCoinWatch/>
    </div>
  )
}

export default Header
