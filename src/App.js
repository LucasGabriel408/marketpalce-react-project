import './App.css';
import { Link, Outlet } from 'react-router-dom';
import React from 'react';

function App() {
  // Theme state with initial value from localStorage or system preference
  const [theme, setTheme] = React.useState(() => {
    const saved = window.localStorage.getItem('theme');
    if (saved) return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme between light/dark
  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      <nav className="app-nav">
        <Link to="/" className="brand">Marketplace</Link>
        <span className="nav-link">Produtos</span>
        <div className="spacer" />
        <button className="button" onClick={toggleTheme} aria-label="Alternar tema">
          {theme === 'light' ? '🌙 Escuro' : '🌞 Claro'}
        </button>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
