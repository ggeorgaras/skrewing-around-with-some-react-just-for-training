import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <header className="container">
        <div className="col-md-12">
            <nav className="navbar navbar-default text-center">
                <ul className="pagination">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/feed-reader">Feed Reader</Link>
                    </li>
                    <li>
                        <Link to="/filter">Filtering</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Footer