import React from 'react'
import Image from 'next/image'
const Banner = () => {
  return (
    <div className='container mx-auto px-5 grid lg:grid-cols-[1fr_550px] xl:grid-cols-[1fr_650px] mb-8'>
    
     <Image src='/images/robot.webp' alt='AI robot' height={650} width={650} className='mx-auto aspect-square rounded-xl object-cover object-center ' />
    
      <div className='text-white flex flex-col justify-center space-y-4'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>Invest in the Future of Finance</h1>
        <p className='max-w-[600px] md:text-xl'>Discover the power of cryptocurrency and blockchain technology. Join our platform and start investing in the future of finance today.</p>
        <div className='space-x-4'>
           <a href="/register">
           <button className='bg-custom-green text-black rounded-md px-8 h-10 border border-black  hover:bg-black hover:text-custom-green hover:border-custom-green'>Sign Up</button>
           </a>
            <a href="/investments">
            <button className='bg-black text-custom-green rounded-md px-8 h-10 border border-custom-green  hover:bg-custom-green hover:text-black hover:border-custom-green'>Learn More</button>
            </a>
        </div>
      </div>
    </div>
  )
}

export default Banner
