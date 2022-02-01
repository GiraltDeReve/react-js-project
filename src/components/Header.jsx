import React from 'react';
import propTypes from 'prop-types';
import logo from '../logo.svg'

function Header(props) {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top mt-1" />
            MOOC
          </div>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <div className="nav-link">Lien 1</div>
            </li>
            <li className="nav-item">
              <div className="nav-link">Lien 2</div>
            </li>
          </ul>
          <div className="navbar-text">
            {props.user
              ? <div>Bienvenue  {props.user}</div>
              : <div>Connectez-vous !</div>}
          </div>
        </div>
      </nav>
    </div>
  );
}

Header.propTypes = {
  user: propTypes.string
}

export default Header;