import { Provider } from 'next-auth/client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <Provider session={pageProps.session}>
    return <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
