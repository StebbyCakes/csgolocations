import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Home</Link>
            <Link to="/about" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>About</Link>
        </nav>
    );
}

export default Navbar;
