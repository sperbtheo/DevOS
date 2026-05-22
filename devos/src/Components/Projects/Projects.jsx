import "./Projects.css"

function Projects() {

    const projects = [

        {
            title: "DevOS",
            description: "Sistema operacional interativo"
        },

        {
            title: "Elevate AI-CV",
            description: "Criador de currículo com IA"
        }

    ]

    return (

        <div className="projects">

            {projects.map((project, index) => (

                <div
                    className="project-card"
                    key={index}
                >

                    <h3>
                        {project.title}
                    </h3>

                    <p>
                        {project.description}
                    </p>

                </div>

            ))}

        </div>

    )

}

export default Projects