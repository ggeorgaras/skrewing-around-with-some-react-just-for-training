import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="container">
        <div className="col-md-12">
            <nav className="navbar navbar-default">
                <ul className="nav navbar-nav">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/feed-reader">Feed Reader</Link>
                    </li>
                    <li>
                        <Link to="/filter">Filtering</Link>
                    </li>
                    <li>
                        <Link to="/live-editor">Live Editor</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Header