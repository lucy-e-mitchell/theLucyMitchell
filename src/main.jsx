import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);

function scaleToFit() {
    const el = document.querySelector('.ds-console');
    if (!el) return;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
        // Don't apply JS scaling on mobile — let CSS/layout handle it
        el.style.display = 'none';
        return;
    }

    // Desktop scaling logic
    el.style.display = 'block';
    el.style.transform = 'scale(1)';

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const elW = el.offsetWidth;
    const elH = el.offsetHeight;

    const scale = Math.min(vw / elW, vh / elH);
    el.style.transform = `scale(${scale})`;
    el.style.position = 'absolute';
    el.style.left = `calc(50% - ${elW * scale / 2}px)`;
    el.style.top = `calc(50% - ${elH * scale / 2}px)`;
}


function handleOrientationChange() {
    const warning = document.getElementById('landscape-warning');
    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobile = window.innerWidth <= 768;

    if (isMobile && isPortrait) {
        warning.classList.add('show');
    } else {
        warning.classList.remove('show');
    }
}

window.addEventListener('load', () => {
    scaleToFit();
    handleOrientationChange();
});

window.addEventListener('resize', () => {
    scaleToFit();
    handleOrientationChange();
});
