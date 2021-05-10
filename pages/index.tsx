import { NextPage } from 'next';
import React from 'react'
import Nav from '../components/nav'


const ProfilePage: NextPage = () => {
  return (
    <>
    <Nav/>
      <div className="container">
        <div className="row">
          <div className="col">
            Página inicial
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage;
