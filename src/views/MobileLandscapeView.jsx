// views/MobileLandscapeView.jsx
import React, { useState } from 'react';
import cvData from '../data/cv.json';
import '../styles.css';

const sections = [
    { label: "About Me", icon: "/icons/about.png" },
    { label: "Education", icon: "/icons/education.png" },
    { label: "Experience", icon: "/icons/experience.png" },
    { label: "Projects", icon: "/icons/projects.png" },
    { label: "Contact", icon: "/icons/contact.png" }
];

export default function MobileLandscapeView() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="mobile-landscape-wrapper">
            <div className="mobile-nav">
                {sections.map((s) => (
                    <button key={s.label} onClick={() => setSelected(s.label)}>
                        <img src={s.icon} alt={s.label} />
                        <span>{s.label}</span>
                    </button>
                ))}
            </div>
            <div className="mobile-content">
                {selected === null ? (
                    <p>Select a section</p>
                ) : (
                    <SectionContent label={selected} />
                )}
            </div>
        </div>
    );
}

function SectionContent({ label }) {
    if (label === "About Me") return <p>{cvData.summary}</p>;

    if (label === "Education")
        return (
            <>
                {cvData.education.map((e, i) => (
                    <div key={i}>
                        <strong>{e.qualification}</strong> – {e.institution} ({e.years})
                    </div>
                ))}
            </>
        );

    if (label === "Experience")
        return (
            <>
                {cvData.experience.map((e, i) => (
                    <div key={i}>
                        <strong>{e.title}</strong> – {e.company} ({e.years})
                        <ul>
                            {e.responsibilities.map((r, j) => (
                                <li key={j}>{r}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </>
        );

    if (label === "Projects")
        return (
            <>
                {cvData.projects.map((p, i) => (
                    <div key={i}>
                        <strong>{p.title}</strong>
                        <ul>
                            {p.details.map((d, j) => (
                                <li key={j}>{d}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </>
        );

    if (label === "Contact") {
        const c = cvData.contact;
        return (
            <>
                📞 {c.phone}<br />
                📧 {c.email}<br />
                💼 <a href={c.linkedin} target="_blank">LinkedIn</a>
            </>
        );
    }

    return null;
}
