import "./Icon.css";

function Icon({ icon, title, onClick }) {
    const isImagePath = typeof icon === "string" && icon.startsWith("/");

    return (
        <div className="icon" onClick={onClick}>
            {isImagePath ? (
                <img className="icon-img" src={icon} alt={title} />
            ) : (
                <span>{icon}</span>
            )}
            <p>{title}</p>
        </div>
    );
}

export default Icon;