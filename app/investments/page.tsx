import React from 'react'
import Header from '../components/Header'
import Proposal from '../components/Proposal'
import Traders from '../components/Traders'
import Payments from '../components/Payments'
import Referal from '../components/referal'
import Footer from '../components/footer'
const Page = () => {
  return (
    <div>
      <Header/>
      <Proposal/>
      <Traders/>
      <Payments/>
      <Referal/>
      <Footer/>
    </div>
  )
}

export default Page
