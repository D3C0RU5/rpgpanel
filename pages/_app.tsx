import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import { UserContextProvider } from '../contexts/SessionUserContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserContextProvider>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </UserContextProvider>
  )
}

export default MyApp
