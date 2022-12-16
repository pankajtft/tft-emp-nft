import '../styles/globals.css'
import MainFooter from './Components/Mainfooter'
import TopNavBar from './Components/TopNavBar'

export default function App({ Component, pageProps }) {
  return(
    <>
<TopNavBar/>
<Component {...pageProps} />
<MainFooter/>
</>
  ) 
}
