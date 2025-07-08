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

        updateView();
        window.addEventListener('resize', updateView);
        window.addEventListener('orientationchange', updateView);

        return () => {
            window.removeEventListener('resize', updateView);
            window.removeEventListener('orientationchange', updateView);
        };
    }, []);

    if (!isMobileLandscapeView && /Mobi|Android/i.test(navigator.userAgent)) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: '2rem',
                fontSize: '1.5rem'
            }}>
                Please rotate your phone to landscape mode.
            </div>
        );
    }

    return <FullConsole isMobileLandscape={isMobileLandscapeView} />;
}
