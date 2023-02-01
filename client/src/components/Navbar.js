import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'
export const Navbar = () => {
    return (
        <div className="navbar">
            <nav>
                <ul>

                    <li>
                        <Link to="/upload">Uploadpicture</Link>
                    </li>
                    <li>
                        <Link to="/gallery">My pictures</Link>
                    </li>
                    {/* <li>
                        <Link to="/uploadw">Upload</Link>
                    </li> */}
                </ul>
            </nav>

        </div>
    );
}