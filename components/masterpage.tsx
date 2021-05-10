import { NextComponentType } from 'next'
import Nav from './nav'

const MasterPage: NextComponentType = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  )
}

export default MasterPage
