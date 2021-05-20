import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import MasterPage from '../components/masterpage'
import { useUserContext } from '../contexts/SessionUserContext'
import { useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()
  const { profile, setNewProfile } = useUserContext()

  const handleChange = ({ target }) => {
    const {name, value} = target;
    let newProfile = profile

    newProfile = {
      ...newProfile,
      [name]: value
    }

    if (!newProfile?._id && !newProfile?.name) {
      newProfile = {
        ...newProfile,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
      }
    }
    setNewProfile(newProfile)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(profile)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/profile`, profile)
    } catch (err) {
      console.log(err.response)
      alert(
        err?.response?.userBD?.error || 'Houve um problema na criação da conta'
      )
    }
  }

  return (
    <MasterPage>
      <div className="container">
        <div className="row">
          <div className="col">
            <div>
              {!session?.user && <>Not signed in</>}
              {session?.user && (
                <>
                  Signed in as {session.user.email}
                  <hr />
                  <p>{profile._id}</p>
                  <p>{session.user.email}</p>
                  <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">apelido</label>
                    <input
                      type="text"
                      name="apelido"
                      className="form-control"
                      value={profile.apelido}
                      onChange={handleChange}
                    />
                    <button className="btn btn-success">Salvar usuario</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MasterPage>
  )
}
