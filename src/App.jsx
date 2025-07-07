import React, { useState, useEffect } from 'react';
import FullConsole from './views/FullConsole.jsx';
import MobileLandscapeView from './views/MobileLandscapeView.jsx';
import './styles.css';

function isMobileLandscape() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    return isMobile && isLandscape;
}

export default function App() {
    const [mobileLandscape, setMobileLandscape] = useState(false);

    useEffect(() => {
        const check = () => setMobileLandscape(isMobileLandscape());

        check(); // initial check
        const timeout = setTimeout(check, 300); // check again after a short delay

        window.addEventListener("resize", check);
        window.addEventListener("orientationchange", check);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("resize", check);
            window.removeEventListener("orientationchange", check);
        };
    }, []);

    return mobileLandscape ? <MobileLandscapeView /> : <FullConsole />;
}
