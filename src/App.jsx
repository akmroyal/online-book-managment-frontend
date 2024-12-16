import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar />
        <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
          <Outlet /> {/* Outlet : it helps to render simply that url changes not upper and lower sections content , Here navbar and footer portion will be fixed only changes apply on outlet */}
        </main>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
