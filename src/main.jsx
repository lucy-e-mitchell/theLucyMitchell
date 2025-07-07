import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);
function scaleToFit() {
    const el = document.querySelector('.ds-console');
    if (!el) return;

    el.style.transform = 'scale(1)'; // Reset before measuring

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const elW = el.offsetWidth;
    const elH = el.offsetHeight;

    const scaleX = vw / elW;
    const scaleY = vh / elH;

    const scale = Math.min(scaleX, scaleY, 1); // Don't upscale

    el.style.transform = `scale(${scale})`;
    el.style.position = 'absolute';
    el.style.left = `calc(50% - ${elW * scale / 2}px)`;
    el.style.top = `calc(50% - ${elH * scale / 2}px)`;
}

window.addEventListener('load', scaleToFit);
window.addEventListener('resize', scaleToFit);
