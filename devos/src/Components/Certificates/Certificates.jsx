import "./Certificates.css";
import { useMemo, useState } from "react";

function Certificates() {
    const [query, setQuery] = useState("");

    const certificates = useMemo(
        () => [
            {
                id: "react-fundamentals",
                title: "React Fundamentals",
                issuer: "Plataforma X",
                date: "2025-02",
                hours: 20,
                url: "",
                skills: ["React", "Hooks", "Components"],
            },
            {
                id: "js-advanced",
                title: "JavaScript Avançado",
                issuer: "Plataforma Y",
                date: "2024-11",
                hours: 30,
                url: "",
                skills: ["JavaScript", "ES6+", "Async"],
            },
        ],
        []
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return certificates;

        return certificates.filter((c) => {
            return (
                c.title.toLowerCase().includes(q) ||
                c.issuer.toLowerCase().includes(q) ||
                c.skills.some((s) => s.toLowerCase().includes(q))
            );
        });
    }, [certificates, query]);

    return (
        <div className="certificates">
            <div className="certificates-header">
                <h2>Certificados</h2>

                <input
                    className="certificates-search"
                    placeholder="Buscar por nome, plataforma ou skill..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="certificates-list">
                {filtered.map((c) => (
                    <div key={c.id} className="certificate-card">
                        <div className="certificate-top">
                            <div>
                                <h3 className="certificate-title">{c.title}</h3>
                                <p className="certificate-meta">
                                    {c.issuer} • {c.date} • {c.hours}h
                                </p>
                            </div>

                            {c.url ? (
                                <a
                                    className="certificate-link"
                                    href={c.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Ver
                                </a>
                            ) : (
                                <span className="certificate-link disabled">Sem link</span>
                            )}
                        </div>

                        <div className="certificate-skills">
                            {c.skills.map((s) => (
                                <span key={s} className="certificate-skill">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="certificates-empty">Nenhum certificado encontrado.</div>
                )}
            </div>
        </div>
    );
}

export default Certificates;