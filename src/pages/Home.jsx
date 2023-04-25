import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import AllUsers from '../components/AllUsers'

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
      <div className='sideBox'>
        <AllUsers />
      </div>
    </div>
  )
}

export default Home