import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar';
// import FetchData from './components/FetchData';
import Home from './components/Home';
import SignUp from './components/SignUp_Login_page/SignUp';
import Login from './components/SignUp_Login_page/Login';
// import ReadLater from './components/ReadLater';
import Error from './components/SignUp_Login_page/Error';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './components/SearchResults'
import ReadLater from './Components/ReadLater';
import Navbar from './Components/Navbar';
import FetchData from './Components/FetchData';
import  {ProtectedRoute}  from './ProtectRouter/ProtectRouter'

function App() {



  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={
         <ProtectedRoute>
          <Home />
          </ProtectedRoute>
          } />

          <Route path='/ipl' element={
         <ProtectedRoute>
          <FetchData cat="ipl" />
          </ProtectedRoute>
          } />
          <Route path='/finance' element={
           <ProtectedRoute>
          <FetchData cat="finance" />
          </ProtectedRoute>
          } />
          {/* <Route path='/politics' element={<FetchData cat="politics" />} /> */}
          <Route path='/search/:searchText' element={
          <ProtectedRoute>
          <SearchResults />
          </ProtectedRoute>
          } />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/readlater' element={<ReadLater />} />
          <Route path='*' element={<Error />} />
        </Routes>

        <Footer />
        <ToastContainer autoClose={1000} />
      </BrowserRouter>
    </>

  )
}

export default App
