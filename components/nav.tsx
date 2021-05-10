import { NextComponentType } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
import React, { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import api from '../utils/api'

import styles from '../styles/components/nav.module.css'

const Nav: NextComponentType = () => {
  const [session, loading] = useSession()
  const [loggedUserWithoutAccount, setLoggedUserWithoutAccount] = useState(
    false
  )

  const { data, error } = useSWR(
    !loggedUserWithoutAccount && !loading
      ? `/api/profile/${session?.user.email}`
      : null,
    api
  )

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Rpgpanel</a>
          <form className="d-flex input-group w-auto">
            {!session && (
              <button
                className="btn btn-primary"
                onClick={() => signIn('auth0')}
              >
                sign in
              </button>
            )}
            {session && (
              <div>
                <button className="btn btn-light" onClick={() => signOut()}>
                  &nbsp; sign out
                </button>
                <img
                  className={styles.avatar}
                  src={session.user.image}
                  alt={session.user.name}
                />
              </div>
            )}
          </form>
        </div>
      </nav>
      {error && (
        <div className="bg-danger text-white ">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3 mt-3 mb-3 text-center">
                You are logged, but we need some info to serve you better!
                <Link href="/profile">
                  <a className="btn btn-sm btn-light w-100 mt-2">
                    <i className="fas fa-exclamation-triangle"></i>
                    &nbsp;Complete account!
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Nav
