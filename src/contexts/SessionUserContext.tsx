import { useSession } from 'next-auth/client'
import api from '../../utils/api'
import { createContext, useState, useContext, useEffect } from 'react'
import useSWR from 'swr'
import { ObjectID } from 'bson'

interface ProfileContextData {
  name: string
  email: string
  image: string
  apelido: string
  _id: ObjectID
}

interface UserContextData {
  profile: ProfileContextData
  setNewProfile: (ProfileContextData) => void
}

const UserContext = createContext({} as UserContextData)

export function UserContextProvider({ children }) {
  const [session, loading] = useSession()
  const [profile, setProfile] = useState({} as ProfileContextData)

  const { data, error } = useSWR(`/api/profile/${session?.user.email}`, api)

  // atualiza o profile com o usuario autenticado quando carregar
  useEffect(() => {
    if (session?.user && !profile.email && !profile?._id) {
      setProfile(p => ({
        ...p,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
      }))
      console.log('atualizado profile com auth0')
      console.log(profile)
    }
  }, [session])

  // atualiza o profile quando encontrar no banco
  useEffect(() => {
    const profileDB = data?.data as ProfileContextData
    if (!profile?._id && profileDB) {
      setProfile(p => ({
        ...p,
        _id: profileDB._id,
        apelido: profileDB.apelido
      }))
      console.log('Atualizando profile com banco')
    }
    console.log(profileDB)
  }, [data])

  let setNewProfile = (newProfile: ProfileContextData) => {
    setProfile(newProfile)
    console.log('Evento de atualização de campos de profile com change')
  }

  return (
    <UserContext.Provider
      value={{
        profile,
        setNewProfile
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  return context
}
/*

export async function getStaticProps() {
  return {
    props: {
      data: 'json'
    },
  };
}
*/
