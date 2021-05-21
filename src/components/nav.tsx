import { NextComponentType } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
import React from 'react'
import Link from 'next/link'
import { useUserContext } from '../contexts/SessionUserContext'

import styles from '../../styles/components/nav.module.css'

const Nav: NextComponentType = () => {
  const { profile } = useUserContext()
  const [session, loading] = useSession();

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">Rpgpanel</a>
          </Link>
          <form className="d-flex input-group w-auto">
            {!session && (
              <button
                className="btn btn-primary"
                onClick={() => signIn('auth-0')}
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
    </>
  )
}

export default Nav
