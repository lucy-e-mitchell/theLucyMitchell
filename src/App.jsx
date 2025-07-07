import React, { useState, useEffect } from 'react';
import FullConsole from './views/FullConsole.jsx';

// Mobile landscape detection
function isMobileLandscape() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    return isMobile && isLandscape;
}

export default function App() {
    const [isMobileLandscapeView, setIsMobileLandscapeView] = useState(isMobileLandscape());

    useEffect(() => {
        const updateView = () => {
            setIsMobileLandscapeView(isMobileLandscape());
        };

        // Delay initial check until layout settles
        const initialCheck = () => {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    updateView();
                }, 100); // Wait a bit after paint
            });
        };

        initialCheck(); // ✅ Run on load
        window.addEventListener('resize', updateView);
        window.addEventListener('orientationchange', updateView);

        return () => {
            window.removeEventListener('resize', updateView);
            window.removeEventListener('orientationchange', updateView);
        };
    }, []);



    return <FullConsole isMobileLandscape={isMobileLandscapeView} />;
}
