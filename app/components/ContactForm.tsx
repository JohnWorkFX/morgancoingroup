import React from 'react'

const ContactForm = () => {
  return (
    <div className='w-full py-12 md:py-24'>
    <div className='container mx-auto px-4 md:px-6'>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-white'>
          <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>Get in Touch</h2>
              <p className=''>Fill out the form below and our team will get back to you as soon as possible.</p>
              <form action="" className='space-y-4 text-black'>
                  <div className='grid grid-cols-1 sm:grid-cols-2'>
                      <input type="text" className='flex h-10 w-full rounded-md bg-white px-3 py-2 text-sm focus:outline-none focus:ring-0' placeholder='Your Name'/>
                      <input type="text" className='flex h-10 w-full rounded-md bg-white px-3 py-2 text-sm focus:outline-none focus:ring-0' placeholder='Your Email'/>
                  </div>
                  <input type="text" className='flex h-10 w-full rounded-md bg-white px-3 py-2 text-sm focus:outline-none focus:ring-0' placeholder='Your Phone Number'/>
                  <textarea  className='flex min-h-[150px] w-full rounded-md bg-white px-3 py-2 text-sm focus:outline-none focus:ring-0' placeholder='Your Message'/>
                  <button className='bg-custom-green rounded-md text-sm px-6 py-2 inline-flex items-center justify-center h-10 font-medium'>Submit</button>
              </form>
          </div>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Our Location</h2>
            <div>
                <p>1585 BROADWAY NEW YORK</p>
                <p>NY 10036, USA</p>
            </div>
          </div>
          <div  className='space-y-4'>
          <h2 className='text-2xl font-bold'>Our Location</h2>
          <p>Email: fxmorgancoininv@gmail.com</p>
          </div>
      </div>
    </div>
  </div>
  )
}

export default ContactForm
