import { NextComponentType } from 'next'
import Nav from './nav'
import Link from 'next/link'
import React from 'react'
import { useUserContext } from '../contexts/SessionUserContext'


const MasterPage: NextComponentType = ({ children }) => {

  const context = useUserContext();

  return (
    <>
      <Nav />
      {!context.profile?._id && (
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
      {children}
    </>
  )
}

export default MasterPage
