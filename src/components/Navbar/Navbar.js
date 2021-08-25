import './Navbar.scss';
import mIcon from '../../assets/img/film.png';
import menuIcon from '../../assets/img/menu.png';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    
    const [showMiniNav, setShowMiniNav] = useState(false);

    useEffect(() => {
        document.querySelectorAll('nav a').forEach(el => el.addEventListener('click', () => setShowMiniNav(false)))
    });

    return (
        <nav> 
          <div className="nav-inner-container">
              <h1>
                  <img id="logo" src={mIcon} alt="logo"/>
                   just search
              </h1>
              <ul className="nav-lg">
                  <li>
                      <NavLink to="/" exact>
                          <span>Home</span>
                      </NavLink>
                  </li>
                  <li>
                      <NavLink to="/gallery">
                          <span>Gallery</span>
                      </NavLink>
                  </li>
                  <li>
                      {/* <NavLink to="/about">
                           <span>About</span>
                      </NavLink> */}
                  </li>
              </ul>
              <div className='nav-sm'>
                <span onClick={() => {setShowMiniNav(!showMiniNav)}}><img src={menuIcon} alt="Menu"/></span>
                <ul className={`${showMiniNav ? 'collapsible' : 'remove-collapsible'}`}>
                    <li>
                        <NavLink to="/" exact>
                            Home {showMiniNav}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/gallery">
                            Gallery
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">
                            About
                        </NavLink>
                    </li>
                </ul>
              </div>         
          </div>
        </nav>
    )
}

export default Navbar;