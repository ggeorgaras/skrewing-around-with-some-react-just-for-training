import React from 'react';

// components
import Header from './common/Header';
import Footer from './common/Footer';
import Main from './components/Main';

// The main app
const App = () => (
    <div className="app">
        <Header />
        <Main />
        <Footer />
    </div>
);

export default App;
