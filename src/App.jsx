import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Check user's preferred color scheme
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle count increment with confetti
  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
    if (count >= 9) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  // Reset count
  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header Section */}
      <header className="app-header">
        <div className="logo-container">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        
        <div className="theme-toggle">
          <button onClick={toggleDarkMode}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <h1 className="app-title">Vite + React</h1>
        
        <div className="card">
          <div className="counter-display">
            <span className="counter-value">{count}</span>
            <div className="counter-buttons">
              <button 
                onClick={incrementCount}
                aria-label="Increment counter"
              >
                Increment
              </button>
              <button 
                onClick={resetCount}
                aria-label="Reset counter"
                disabled={count === 0}
              >
                Reset
              </button>
            </div>
          </div>
          
          <p className="app-description">
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>

        {/* Features Grid */}
        <div className="features">
          <div className="feature-card">
            <h3>⚡ Vite</h3>
            <p>Blazing fast frontend tooling</p>
          </div>
          <div className="feature-card">
            <h3>⚛️ React</h3>
            <p>Library for building UIs</p>
          </div>
          <div className="feature-card">
            <h3>🎨 Tailwind</h3>
            <p>Utility-first CSS framework</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <div className="social-links">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="confetti" style={{
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 0.5}s`
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
