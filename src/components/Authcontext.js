import react, { createContext, useState, useEffect } from 'react';
import validator from 'validator'
import {Reg_URL,Login_URL,Logout_URL,Token_Url} from '../api'



export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {

 

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [demo, setDemo] = useState(false)
  const [registerdata, setregisterdata] = useState({ username: "", password: "", email: "" });
  const [logindata, setLogindata] = useState({ username: "", password: "", email: "" });
  const [showRegister, setShowRegister] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [showsuccessReg, setShowsuccessReg] = useState(false)
  const [msg, setMsg] = useState('')
  const [strong, setStrong] = useState(false)
  // const [IsdataAdd, setIsdataAdd]= useState(false)

var IsdataAdd = false



  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setTokenDatainDB(token)
        setIsAuthenticated(true)
      }
    };
    checkAuthStatus();
  }, []);




  const setTokenDatainDB = async (token) => {
    try {
      await fetch(`${Token_Url}?token=${token}`)
    } catch (error) {
      console.log(error.message)
    }

  }

  const SuccessLogin = () => {
    try {
      setIsAuthenticated(true)
      setDemo(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  const SuccessLogout = () => {
    try {
      setIsAuthenticated(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleShowDemo = () => {
    try {
      setDemo(true)
      setMsg('')
    } catch (error) {
      console.log(error.message)
    }
  }



  const handleRegData = (e, isPassword) => {
    try {
      const { name, value } = e.target
      setregisterdata((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (isPassword) {
        if (validator.isStrongPassword(e.target.value)) {
          setStrong(true)
          setMsg('Strong password')

        } else {
          setStrong(false)
          setMsg('Please set strong password')
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleLoginData = (e) => {
    try {
      const { name, value } = e.target
      setLogindata((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } catch (error) {
      console.log(error.message)
    }
  }

  const ShowFormReg = () => {
    setShowLogin(false)
    setShowRegister(true)
    setDemo(false)

  }

  const ShowFormLogin = () => {
    try {
        setShowRegister(false);
        setShowLogin(true);
        setStrong(false)
        setMsg('')
        setregisterdata({ username: "", password: "", email: "" });
    } catch (error) {
      console.log(error.message)
    }

  }


  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(Reg_URL, {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerdata),
         credentials: 'include'
      })
      if (response.ok) {
        setShowsuccessReg(true)
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const username = '11190628'; // Replace with actual username
const password = '60-dayfreetrial';
      const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
      const response = await fetch(Login_URL, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth,
          
        },
        body: JSON.stringify(logindata),
         credentials: 'include'
      })

      if (response.ok) {
        const token = await response.json();
        const tokenData = token.data
        if (tokenData.includes('Invalid')) {
          alert('Invalid Username Password')
        } else {
          localStorage.setItem('token', token.data)
          setIsAuthenticated(true)
          setDemo(false)
        }

      }
    } catch (error) {
      console.log(error.message)
    }
  }



  const handleLogout = async () => {
    try {
      const response = await fetch(Logout_URL, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
      })

      if (response.ok) {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setShowRegister(true)
        setShowLogin(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Authcontext.Provider value={{ isAuthenticated, demo, registerdata, logindata, showRegister, showLogin, showsuccessReg, msg, strong, handleShowDemo, handleLogout, SuccessLogout, SuccessLogin, handleRegData, handleLoginData, ShowFormReg, ShowFormLogin, handleRegister, handleLogin,IsdataAdd }}>
      {children}
    </Authcontext.Provider>

  );

}