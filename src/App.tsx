

import './App.css'
import { Outlet, useNavigation } from 'react-router'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Sidebar from './components/Layout/Sidebar'

function App() {

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <>

      {isNavigating && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-loading-bar z-50"></div>
      )}
      <Header />
      <Sidebar />
      <main className='relative'>

        <Outlet />
      </main>
      <Footer />

    </>
  )
}

export default App
