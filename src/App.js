
import React, { useState } from 'react';

const sections = ["Start", "About Me", "Experience", "Projects", "Contact"];

export default function GameboyCV() {
  const [current, setCurrent] = useState(0);
  const goNext = () => setCurrent((prev) => (prev + 1) % sections.length);
  const goBack = () => setCurrent((prev) => (prev - 1 + sections.length) % sections.length);

  return (
    <div style={{
      backgroundColor: '#0f380f',
      color: '#8bac0f',
      border: '4px solid #306230',
      borderRadius: '1rem',
      padding: '1rem',
      maxWidth: '400px',
      margin: '2rem auto',
      textAlign: 'center'
    }}>
      <h1>{sections[current]}</h1>
      <div style={{ minHeight: '150px' }}>
        {current === 0 && <p>Press A to Start Your Journey!</p>}
        {current === 1 && <p>👋 Hi, I'm [Your Name], a Software Engineer focused on building delightful experiences.</p>}
        {current === 2 && <ul><li>Company A – Frontend Dev (2022-2024)</li><li>Company B – Fullstack Engineer (2020-2022)</li></ul>}
        {current === 3 && <ul><li>Retro CV – Gameboy Portfolio App</li><li>Weatherly – Weather PWA</li></ul>}
        {current === 4 && <p>Email: your@email.com<br />GitHub: github.com/yourhandle<br />LinkedIn: linkedin.com/in/yourname</p>}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={goBack}>B: Back</button>
        <button onClick={goNext} style={{ marginLeft: '1rem' }}>A: Next</button>
      </div>
    </div>
  );
}
