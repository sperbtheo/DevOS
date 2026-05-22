import "./Icon.css"

function Icon({ icon, title, onClick }) {

    return (

        <div
            className="icon"
            onClick={onClick}
        >

            <span>{icon}</span>

            <p>{title}</p>

        </div>

    )

}

export default Icon