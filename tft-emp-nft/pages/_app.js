import '../styles/globals.css'
import MainFooter from './Components/Mainfooter'
import TopNavBar from './Components/TopNavBar'
import Login from './Components/Login'

export default function App({ Component, pageProps }) {

  const isTrue = true;

  return(
    isTrue ? <Login/> :
    <>
<TopNavBar/>
<Component {...pageProps} />
<MainFooter/>
</>
  ) 
}
