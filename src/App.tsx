import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, useParams } from 'react-router-dom';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import CurrencyTrends from './components/CurrencyTrends/CurrencyTrends';
import CurrencyList from './components/CurrencyList/CurrencyList';
import styles from './App.module.css';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const CurrencyTrendsWrapper: React.FC = () => {
  const { code } = useParams<{ code: string }>();

  if (!code) {
    return <div>Brak kodu waluty</div>;
  }

  return <CurrencyTrends code={code} />;
};

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <div className={styles.appContainer}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/" className={styles.navLink}>
              Lista Walut
            </NavLink>
          </li>
          <li>
            <NavLink to="/converter" className={styles.navLink}>
              Kalkulator Walutowy
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<CurrencyList />} />
        <Route path="/currency/:code" element={<CurrencyTrendsWrapper />} />
        <Route path="/converter" element={<CurrencyConverter />} />
      </Routes>
    </div>
  </Router>
);

export default App;
