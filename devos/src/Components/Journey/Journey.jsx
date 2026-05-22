import "./Journey.css";
import { useEffect, useState } from "react";
import { getGithubData } from "../../services/githubService";
import { githubData as githubMock } from "../../Data/github";

function Journey() {
    const [githubData, setGithubData] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        async function loadGithub() {
            try {
                const data = await getGithubData();
                if (data) {
                    setGithubData(data);
                    setStatus("ready");
                } else {
                    setGithubData(githubMock);
                    setStatus("fallback");
                }
            } catch {
                setGithubData(githubMock);
                setStatus("fallback");
            }
        }

        loadGithub();
    }, []);

    const data = {
        streak: 12,
        studyHours: 184,
        weeklyGoal: 20,
        currentHours: 16,
        skills: ["HTML", "CSS", "JavaScript", "React"],
    };

    if (status === "loading") {
        return <div className="journey">Carregando GitHub...</div>;
    }

    if (!githubData) {
        return <div className="journey">Não foi possível carregar dados do GitHub.</div>;
    }

    const stats = [
        { icon: "🔥", value: data.streak, label: "dias" },
        { icon: "⏱️", value: data.studyHours, label: "horas" },
        { icon: "👥", value: githubData.followers ?? "-", label: "seguidores" },
        { icon: "📁", value: githubData.repositories ?? "-", label: "repos" },
    ];

    const progress = Math.min((data.currentHours / data.weeklyGoal) * 100, 100);

    return (
        <div className="journey">
            <h2>Dev Journey</h2>

            <div className="stats">
                {stats.map((item, index) => (
                    <div className="card" key={index}>
                        <span>{item.icon}</span>
                        <h3>{item.value}</h3>
                        <p>{item.label}</p>
                    </div>
                ))}
            </div>

            <h3>Tecnologias</h3>
            <div className="skills">
                {data.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                ))}
            </div>

            <h3>Atividade recente {status === "fallback" ? "(offline)" : ""}</h3>
            <div className="activity">
                {(githubData.recentActivity || []).map((activity, index) => (
                    <div className="activity-item" key={index}>
                        {activity}
                    </div>
                ))}
            </div>

            <h3>Meta semanal</h3>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p>
                {data.currentHours} / {data.weeklyGoal} horas
            </p>
        </div>
    );
}

export default Journey;