import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { FormControlLabel } from '@mui/material'
import SwitchButton from './ThemeButton'
import { useTheme } from '../context/ThemeMode'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  const theme = useTheme();
  console.log("theme", theme.theme)
  return (
    <div className='navbar'>
      <FormControlLabel
        control={<SwitchButton sx={{ m: 1 }} defaultChecked />}
        label=""
        onChange={theme.toggleTheme}
      />
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Log out</button>
      </div>
    </div>
  )
}

export default Navbar