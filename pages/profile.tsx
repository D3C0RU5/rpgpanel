import { signIn, signOut, useSession } from 'next-auth/client'
import React, { FormEvent, useEffect, useState } from 'react'
import useSWR from 'swr'
import api from '../utils/api'
import axios from 'axios'
import Nav from '../components/nav'
import MasterPage from '../components/masterpage'

interface i_profile {
  name: string
  email: string
}

export default function Home() {
  const [session, loading] = useSession()
  const [profile, setProfile] = useState({} as i_profile)
  const [loggedUserWithoutAccount, setLoggedUserWithoutAccount] = useState(
    false
  )
  const [errorCount, setErrorCount] = useState(0)

  const { data, error } = useSWR(
    !loggedUserWithoutAccount && !loading
      ? `/api/profile/${session?.user.email}`
      : null,
    api
  )

  useEffect(() => {
    setErrorCount(p => p + 1)
    if (error && errorCount === 1) setLoggedUserWithoutAccount(true)
  }, [error, setErrorCount])

  useEffect(() => {
    const _profileSWR = data?.data as i_profile
    if (_profileSWR) {
      setProfile(p => ({
        ...p,
        ..._profileSWR
      }))
    }
  }, [data])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!data) {
      setProfile(p => ({
        ...p,
        ...session.user
      }))
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/profile`, profile)
      setLoggedUserWithoutAccount(false)
    } catch (err) {
      alert(
        err?.response?.data?.error || 'Houve um problema na criação da conta'
      )
    }
  }

  const changeProfile = ({ target }) => {
    const { value, name } = target
    setProfile(p => ({
      ...p,
      [name]: value
    }))
  }

  return (
    <MasterPage>
      <div className="container">
        <div className="row">
          <div className="col">
            <div>
              {!session && (
                <>
                  Not signed in
                </>
              )}
              {session && (
                <>
                  Signed in as {session.user.email}
                  <hr />
                  <p>{session.user.email}</p>
                  <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">apelido</label>
                    <input
                      type="text"
                      name="apelido"
                      className="form-control"
                      onChange={changeProfile}
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
