import "./Journey.css"
import { useEffect, useState } from "react"
import { getGithubData } from "../../services/githubService"

function Journey() {

    const [githubData, setGithubData] = useState(null)

    useEffect(() => {

        async function loadGithub() {

            const data = await getGithubData()

            setGithubData(data)

        }

        loadGithub()

    }, [])

    const data = {

        streak: 12,
        studyHours: 184,
        weeklyGoal: 20,
        currentHours: 16,

        skills: [

            "HTML",
            "CSS",
            "JavaScript",
            "React"

        ]

    }

    if (!githubData) {

        return (

            <div className="journey">

                Carregando GitHub...

            </div>

        )

    }

    const stats = [

        {
            icon: "🔥",
            value: data.streak,
            label: "dias"
        },

        {
            icon: "👥",
            value: githubData.followers,
            label: "seguidores"
        },

        {
            icon: "📁",
            value: githubData.repositories,
            label: "repos"
        }

    ]

    const progress = Math.min(
        (data.currentHours / data.weeklyGoal) * 100,
        100
    )

    return (

        <div className="journey">

            <h2>
                Dev Journey
            </h2>

            <div className="stats">

                {stats.map((item, index) => (

                    <div
                        className="card"
                        key={index}
                    >

                        <span>
                            {item.icon}
                        </span>

                        <h3>
                            {item.value}
                        </h3>

                        <p>
                            {item.label}
                        </p>

                    </div>

                ))}

            </div>

            <h3>
                Tecnologias
            </h3>

            <div className="skills">

                {data.skills.map(skill => (

                    <span key={skill}>
                        {skill}
                    </span>

                ))}

            </div>

            <h3>
                Atividade recente
            </h3>

            <div className="activity">

                {githubData.recentActivity.map((activity, index) => (

                    <div
                        className="activity-item"
                        key={index}
                    >

                        {activity}

                    </div>

                ))}

            </div>

            <h3>
                Meta semanal
            </h3>

            <div className="progress-bar">

                <div
                    className="progress-fill"
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>

            <p>

                {data.currentHours}/
                {data.weeklyGoal} horas

            </p>

        </div>

    )

}

export default Journey