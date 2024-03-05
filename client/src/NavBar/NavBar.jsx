import { Link } from "react-router-dom";

import { FaUserPlus, FaVolumeXmark, FaVolumeHigh } from "react-icons/fa6";
import { FaHome, FaDungeon,   } from "react-icons/fa";

function NavBar({logout, toggleSound, sound}) {
  return (
    <div className='NavBar'>
      <Link to="/">
        <div className='NavBtn'>
          <FaHome />
        </div>
      </Link>
      <Link to="NewCharacter">
        <div className='NavBtn'>
          <FaUserPlus />
        </div>
      </Link>
      <Link to="/">
        <div className='NavBtn' onClick={logout}>
          <FaDungeon  />
        </div>
      </Link>
      <div className="NavBtn" onClick={toggleSound}>
        {sound ? <FaVolumeHigh/>: <FaVolumeXmark/>}
      </div>
    </div>
  )
}

export default NavBar