import React from 'react';
import Header from './components/common/Header';
import './Layout.css';

function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="main-content">
                {children}
            </main>
        </>
    );
}

export default Layout; 