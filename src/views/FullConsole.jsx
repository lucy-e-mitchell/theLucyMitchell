import React, { useState, useRef, useEffect } from 'react';
import cvData from '../data/cv.json';
import '../styles.css';

const sections = [
    { label: "About Me", icon: "/icons/about.png" },
    { label: "Education", icon: "/icons/education.png" },
    { label: "Experience", icon: "/icons/experience.png" },
    { label: "Projects", icon: "/icons/projects.png" },
    { label: "Skills", icon: "/icons/skills.png" },
    { label: "Contact", icon: "/icons/contact.png" }
];

export default function FullConsole({ isMobileLandscape }) {
    const [inMenu, setInMenu] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentSection, setCurrentSection] = useState(null);
    const scrollRef = useRef(null);

    const handleLeft = () => {
        setSelectedIndex((prev) => (prev - 1 + sections.length) % sections.length);
    };

    const handleRight = () => {
        setSelectedIndex((prev) => (prev + 1) % sections.length);
    };

    const handleSelect = () => {
        setCurrentSection(sections[selectedIndex].label);
        setInMenu(false);
    };

    const handleBack = () => {
        setInMenu(true);
        setCurrentSection(null);
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
    };

    const COLS = 3; // 3 across

    const handleUp = () => {
        if (inMenu) {
            setSelectedIndex((prev) => {
                // move up a row (subtract 3)
                let next = prev - COLS;
                if (next < 0) {
                    // wrap to last possible row
                    next = prev + COLS * (Math.ceil(sections.length / COLS) - 1);
                    if (next >= sections.length) {
                        // if wrapped row is incomplete, land on last item
                        next = sections.length - 1;
                    }
                }
                return next;
            });
        } else if (scrollRef.current) {
            scrollRef.current.scrollBy({ top: -60, behavior: "smooth" });
        }
    };

    const handleDown = () => {
        if (inMenu) {
            setSelectedIndex((prev) => {
                // move down a row (add 3)
                let next = prev + COLS;
                if (next >= sections.length) {
                    // wrap back to same column in first row
                    next = prev % COLS;
                }
                return next;
            });
        } else if (scrollRef.current) {
            scrollRef.current.scrollBy({ top: 60, behavior: "smooth" });
        }
    };


    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'ArrowDown') handleDown();
            if (e.key === 'ArrowUp') handleUp();
            if (e.key === 'ArrowLeft') handleLeft();
            if (e.key === 'ArrowRight') handleRight();
            if (e.key === 'Enter') handleSelect();
            if (e.key === 'Escape') handleBack();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <div className={`ds-console ${isMobileLandscape ? 'force-mobile-landscape' : ''}`}>

        {/* Top Screen */}
            <div className="ds-screen-wrapper">
                <div className="ds-screen">
                    <div className="ds-screen-inner">
                        <div className="ds-avatar">
                            <img src="/avatar.png" alt="Avatar of Lucy Mitchell" />
                        </div>
                        <div className="ds-header">Lucy Mitchell CV</div>
                        <p className="ds-preview">Use the bottom screen to explore my CV!</p>
                    </div>
                </div>
            </div>

            <div className="ds-divider"></div>

            {/* Bottom Screen + D-pad + AB */}
            <div className="ds-bottom-container">
                {/* D-Pad */}
                <div className="ds-dpad">
                    <div>
                        <div className="ds-dpad-button up" onClick={handleUp}></div>
                        <div className="ds-dpad-button left" onClick={handleLeft}></div>
                        <div className="ds-dpad-button center"></div>
                        <div className="ds-dpad-button right" onClick={handleRight}></div>
                        <div className="ds-dpad-button down" onClick={handleDown}></div>
                    </div>
                </div>

                {/* Bottom Screen */}
                <div className="ds-screen">
                    <div className="ds-screen-inner ds-bottom-screen-inner" ref={scrollRef}>
                        {inMenu ? (
                                <div className="ds-menu-grid">
                                    {sections.map((section, i) => (
                                        <div
                                            key={section.label}
                                            className={`ds-menu-item ${i === selectedIndex ? "selected" : ""}`}
                                            onClick={() => {
                                                setSelectedIndex(i);
                                                setCurrentSection(section.label);
                                                setInMenu(false);
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div className="ds-menu-icon">
                                                <img
                                                    src={section.icon}
                                                    alt={section.label}
                                                    className="ds-icon-img"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        ) : (
                            <>
                                <h2 className="ds-section-title">{currentSection}</h2>
                                <div className="ds-content">
                                    {currentSection === "About Me" && <p>{cvData.summary}</p>}

                                    {currentSection === "Experience" && (
                                        <div>
                                            {cvData.experience.map((item, i) => (
                                                <div key={i} style={{ marginBottom: '1rem' }}>
                                                    <strong>{item.title}</strong><br />
                                                    <span>{item.company}, {item.location} ({item.years})</span>
                                                    <ul>
                                                        {item.responsibilities.map((resp, j) => (
                                                            <li key={j}>{resp}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {currentSection === "Education" && (
                                        <div>
                                            {cvData.education.map((item, i) => (
                                                <div key={i} style={{ marginBottom: '1rem' }}>
                                                    <strong>{item.qualification}</strong><br />
                                                    <span>{item.institution}, {item.location} ({item.years})</span>
                                                    <ul>
                                                        {item.notes.map((note, j) => (
                                                            <li key={j}>{note}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {currentSection === "Projects" && (
                                        <div>
                                            {cvData.projects.map((project, i) => (
                                                <div key={i} style={{ marginBottom: '1rem' }}>
                                                    <strong>{project.title}</strong>
                                                    <ul>
                                                        {project.details.map((detail, j) => (
                                                            <li key={j}>{detail}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {currentSection === "Skills" && (
                                        <div>
                                            {Object.entries(cvData.skills).map(([category, items], idx) => (
                                                <div key={idx} style={{ marginBottom: '1rem' }}>
                                                    <strong style={{ textTransform: 'capitalize' }}>{category.replace(/([A-Z])/g, ' $1')}</strong>
                                                    <ul>
                                                        {items.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {currentSection === "Contact" && (
                                        <p>
                                            📞 {cvData.contact.phone}<br />
                                            📧 {cvData.contact.email}<br />
                                            💼 <a href={cvData.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* AB Buttons */}
                <div className="ds-ab-cross">
                    <div>
                        <div className="ds-ab-circle"></div>
                        <div className="ds-ab-circle"></div>
                        <div className="ds-ab-circle" onClick={handleBack}>B</div>
                        <div className="ds-ab-circle"></div>
                        <div className="ds-ab-circle" onClick={handleSelect}>A</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
