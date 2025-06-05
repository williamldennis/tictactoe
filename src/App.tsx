
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  console.log("App mounted")

  return (
    <>
      <h1 className='font-bold text-4xl bg'>Jill 👸 Jack 🤴 Joe ☕️</h1>
      <p className='text-sm m-3'>Line up 3 Jacks or 3 Jills. Win a cup of joe.</p>
      <Outlet />
    </>
  )
}

export default App
