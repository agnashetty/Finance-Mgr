import { Link } from "react-router-dom"
import "../styles/Navbar.css";
import { useContext, useState } from "react";
import { Authcontext } from "./Authcontext";
import { FiAlignJustify, FiX  } from "react-icons/fi";
const Navbar = () => {

const {ShowFormReg, handleLogout, demo} = useContext(Authcontext)
const [expand, setExpand]= useState(false)

  return (
    <div>
      <div className="navbar">
        <div className="togglebtn">
          <button onClick={()=> setExpand(prev => !prev)}>
          {expand?( <FiX/> ): ( <FiAlignJustify/>)}
          </button>
        </div>

        {demo && 
         <p style={{ left: '5px', color:'white' , position:'absolute'}}>DEMO SOFTWARE</p>
}
<div className={`links ${expand? "open":""}`}>
<Link to={"/"}>HOME</Link>
        <Link to={"/Month"}>MONTHLY</Link>
        <Link to={"/Report"}>REPORT</Link>
        <Link to={"/Category"}>CATEGORY</Link>

</div>
       
        {demo ? (

          <button className='btn_logout' onClick={ShowFormReg}>REGISTER</button>
        ):(
          <button className='btn_logout' onClick={handleLogout}>Logout</button>
        )}
        
      </div>
    </div>
  )
}

export default Navbar
