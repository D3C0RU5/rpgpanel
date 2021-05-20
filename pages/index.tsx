import { NextPage } from 'next'
import React from 'react'
import MasterPage from '../components/masterpage'
import { useUserContext } from '../contexts/SessionUserContext'

const ProfilePage: NextPage = () => {
  const { profile } = useUserContext()

  return (
    <>
      <MasterPage>
        <div className="container">
          <div className="row">
            <div className="col">Página inicial</div>
            <div className="col">
              {profile?._id}
            </div>
          </div>
        </div>
      </MasterPage>
    </>
  )
}

export default ProfilePage
