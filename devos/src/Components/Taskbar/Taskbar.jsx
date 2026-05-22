import "./Taskbar.css";

function Taskbar({ openWindows, activeWindowId, onToggleWindow }) {
    return (
        <div className="taskbar">
            <span>DevOS</span>

            <div className="taskbar-apps">
                {openWindows.map((window) => {
                    const isActive = window.id === activeWindowId && !window.minimized;

                    return (
                        <button
                            key={window.id}
                            className={`taskbar-app ${isActive ? "active" : ""} ${window.minimized ? "minimized" : ""
                                }`}
                            onClick={() => onToggleWindow(window.id)}
                        >
                            {window.icon} {window.title}
                        </button>
                    );
                })}
            </div>

            <span>
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
        </div>
    );
}

export default Taskbar;