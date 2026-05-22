import "./Journey.css"

function Journey() {

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

                <div className="card">

                    🔥
                    <h3>{data.streak}</h3>
                    <p>dias</p>

                </div>

                <div className="card">

                    ⏱️
                    <h3>{data.studyHours}</h3>
                    <p>horas</p>

                </div>

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