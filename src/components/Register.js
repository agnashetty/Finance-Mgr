import React, { useContext } from 'react'
import '../styles/Register.css'
import { Authcontext } from './Authcontext'




const Register = () => {
   

   const {showRegister,strong, showLogin,handleLogin,ShowFormReg, showsuccessReg,registerdata,handleRegData, handleRegister, handleShowDemo,logindata,handleLoginData, ShowFormLogin,msg} = useContext(Authcontext)


    return (
        <div className='main_container'>
            <div className="initial_navbar">

            </div>
            {showsuccessReg &&
                <>
                    <p style={{ backgroundColor: "green", textAlign: "center", color: "wheat" }}> <b>Registered succesfuly..! Please login</b></p>
                </>}
            {showRegister &&
                <div className="">
                    <h2 className='reg_title'>REGISTER</h2>
                    <div className="regiser_container">
                        <form action="" method="post" onSubmit={handleRegister}>
                            <input type="text" placeholder='Enter User Name' name='username' value={registerdata.username} onChange={(e) => handleRegData(e, false)} />
                            <input type="email" placeholder='Enter email' name='email' value={registerdata.email} onChange={(e) => handleRegData(e, false)} />
                            <input type="password" placeholder='Enter Password' name='password' value={registerdata.password} onChange={(e) => handleRegData(e, true)} />
                            {strong ? <span style={{ color: 'green' }}> <b>{msg}</b> </span> : <span style={{ color: 'red' }}><b>{msg}</b> </span>}
                            <input type="submit" />
                        </form>
                    </div>
                </div>

            }

            {showLogin &&

                <div className="">
                    <h2 className='reg_title'>LOGIN</h2>
                    <div className="login_container">
                        <form action="" method="post" onSubmit={handleLogin}>
                            <input type="text" name='username' value={logindata.username} onChange={handleLoginData} placeholder='Enter User Name' />
                            <input type="password" placeholder='Enter Password' name='password' value={logindata.password} onChange={handleLoginData} />
                            <input type="submit" />
                        </form>
                    </div>
                </div>
            }

            <div className="btn_register">
                <p>New User? Please click here to Register  <button onClick={ShowFormReg}>Click</button></p>
                <p>Already have an account then please login  <button onClick={ShowFormLogin}>Login Here</button></p>
               
              
            </div>

            <div className="showdemo">
            <button className='' onClick={handleShowDemo}><b>SHOW DEMO</b></button>
            </div>
        </div>
    )
}

export default Register
