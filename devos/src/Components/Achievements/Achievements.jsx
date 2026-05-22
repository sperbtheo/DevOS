import "./Achievements.css";
import { useMemo, useState } from "react";

function Achievements() {
    const [profile] = useState({
        firstProjectPublished: true,
        commits: 324,
        firstDeploy: true,
        firstClient: false,
        learnedReact: true,
        streakDays: 14,
    });

    const achievements = useMemo(() => {
        return [
            {
                id: "first-project",
                title: "Primeiro projeto publicado",
                description: "Publicou o primeiro projeto online.",
                unlocked: profile.firstProjectPublished,
                icon: "🚀",
            },
            {
                id: "100-commits",
                title: "100 commits",
                description: "Fez 100 commits no GitHub.",
                unlocked: profile.commits >= 100,
                icon: "💯",
            },
            {
                id: "learned-react",
                title: "Aprendeu React",
                description: "Concluiu a base de React (hooks, componentes e estado).",
                unlocked: profile.learnedReact,
                icon: "⚛️",
            },
            {
                id: "first-deploy",
                title: "Primeiro deploy",
                description: "Fez o primeiro deploy em produção.",
                unlocked: profile.firstDeploy,
                icon: "🌐",
            },
            {
                id: "first-client",
                title: "Primeiro cliente",
                description: "Fechou o primeiro trabalho pago.",
                unlocked: profile.firstClient,
                icon: "🤝",
            },
            {
                id: "365-streak",
                title: "365 dias de streak",
                description: "Manteve consistência por 365 dias.",
                unlocked: profile.streakDays >= 365,
                icon: "🔥",
            },
        ];
    }, [profile]);

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
        <div className="achievements">
            <div className="achievements-header">
                <h2>Achievements</h2>
                <p>
                    Desbloqueadas: <strong>{unlockedCount}</strong> / {achievements.length}
                </p>
            </div>

            <div className="achievements-grid">
                {achievements.map((a) => (
                    <div
                        key={a.id}
                        className={`achievement-card ${a.unlocked ? "unlocked" : "locked"}`}
                    >
                        <div className="achievement-icon">{a.icon}</div>

                        <div className="achievement-info">
                            <h3>{a.title}</h3>
                            <p>{a.description}</p>
                        </div>

                        <div className="achievement-badge">
                            {a.unlocked ? "Unlocked" : "Locked"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Achievements;