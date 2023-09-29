import React from 'react'
import "./Button.css"
import { Link } from 'react-router-dom';

function Button_custom({text,url}) {
  return (
      <div className="button_container">
          <Link to={url} className="no_decorate">
              <div className="no_decorate">{text}</div>
          </Link>
      </div>
  );
}

export default Button_custom;