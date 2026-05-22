import "./Taskbar.css"

function Taskbar({ openWindows, onFocus }) {

    return (

        <div className="taskbar">

            <span>DevOS</span>

            <div className="taskbar-apps">

                {openWindows.map((window) => (

                    <button
                        key={window.id}
                        className="taskbar-app"
                        onClick={() => onFocus(window.id)}
                    >

                        {window.icon}

                        {window.title}

                    </button>

                ))}

            </div>

            <span>

                {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })}

            </span>

        </div>

    )

}

export default Taskbar