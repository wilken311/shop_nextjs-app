import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "../public/assets/styles/index.css"
import "../public/assets/styles/main.scss"
import '@fortawesome/fontawesome-free/css/all.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
        <Component {...pageProps} />
  )
}

export default MyApp
