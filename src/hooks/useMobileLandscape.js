import { useState, useEffect } from 'react';

export default function useMobileLandscape() {
    const check = () => {
        return /Mobi|Android/i.test(navigator.userAgent) &&
            window.matchMedia("(orientation: landscape)").matches;
    };

    const [isMobileLandscape, setIsMobileLandscape] = useState(check());

    useEffect(() => {
        const handleChange = () => setIsMobileLandscape(check());
        window.addEventListener("resize", handleChange);
        window.addEventListener("orientationchange", handleChange);
        return () => {
            window.removeEventListener("resize", handleChange);
            window.removeEventListener("orientationchange", handleChange);
        };
    }, []);

    return isMobileLandscape;
}
