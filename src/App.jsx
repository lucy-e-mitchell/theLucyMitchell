import React, { useState } from 'react';
import cvData from './data/cv.json';
import './styles.css';

const sections = [
    { label: "About Me", icon: "/icons/about.png" },
    { label: "Education", icon: "/icons/education.png" },
    { label: "Experience", icon: "/icons/experience.png" },
    { label: "Projects", icon: "/icons/projects.png" },
    { label: "Contact", icon: "/icons/contact.png" }
];

export default function App() {
    const [inMenu, setInMenu] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentSection, setCurrentSection] = useState(null);

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
    };

    return (
        <div className="ds-console-wrapper">
            <div className="ds-console">
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

            <div className="ds-bottom-container">
                {/* D-Pad */}
                <div className="ds-dpad">
                    <div>
                        <div className="ds-dpad-button up" ></div>
                        <div className="ds-dpad-button left" onClick={handleLeft}></div>
                        <div className="ds-dpad-button center"></div>
                        <div className="ds-dpad-button right" onClick={handleRight}></div>
                        <div className="ds-dpad-button down"></div>
                    </div>
                </div>

                {/* Bottom Screen */}
                <div className="ds-screen">
                    <div className="ds-screen-inner ds-bottom-screen-inner">
                        {inMenu ? (
                            <div className="ds-menu-grid">
                                {sections.map((section, i) => (
                                    <div
                                        key={section.label}
                                        className={`ds-menu-item ${i === selectedIndex ? 'selected' : ''}`}
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

                {/* A/B Buttons */}
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
        </div>
    );
}
