import "./Desktop.css";
import { useEffect, useMemo, useState } from "react";
import Taskbar from "../Taskbar/Taskbar";
import Icon from "../Icon/Icon";
import Window from "../Window/Window";

import { appRegistry } from "../../data/appRegistry";
import { useWindowManager } from "../../Hooks/useWindowManager";

function Desktop() {
    const {
        openWindows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        focusWindow,
        toggleWindowFromTaskbar,
    } = useWindowManager();

    const [theme, setTheme] = useState(localStorage.getItem("devos-theme") || "red");

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const apps = useMemo(() => Object.values(appRegistry), []);

    function changeTheme(selectedTheme) {
        setTheme(selectedTheme);
        localStorage.setItem("devos-theme", selectedTheme);
    }

    return (
        <div className="desktop">
            <div className="desktop-icons">
                {apps.map((app) => (
                    <Icon
                        key={app.id}
                        icon={app.icon}
                        title={app.title}
                        onClick={() => openWindow(app)}
                    />
                ))}
            </div>

            {openWindows
                .filter((w) => !w.minimized)
                .map((w) => {
                    const AppComponent = appRegistry[w.id]?.component;

                    return (
                        <Window
                            key={w.id}
                            title={w.title}
                            zIndex={w.zIndex}
                            maximized={w.maximized}
                            onFocus={() => focusWindow(w.id)}
                            onClose={() => closeWindow(w.id)}
                            onMinimize={() => minimizeWindow(w.id)}
                            onMaximize={() => toggleMaximizeWindow(w.id)}
                        >
                            {AppComponent ? (
                                <AppComponent changeTheme={changeTheme} />
                            ) : (
                                <div>App não registrado: {w.id}</div>
                            )}
                        </Window>
                    );
                })}

            <Taskbar
                openWindows={openWindows}
                activeWindowId={activeWindowId}
                onToggleWindow={toggleWindowFromTaskbar}
            />
        </div>
    );
}

export default Desktop;