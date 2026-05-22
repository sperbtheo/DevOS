import "./Desktop.css"
import { useState, useEffect } from "react"

import Taskbar from "../Taskbar/Taskbar"
import Icon from "../Icon/Icon"
import Window from "../Window/Window"
import Terminal from "../Terminal/Terminal"
import Projects from "../Projects/Projects"
import Settings from "../Settings/Settings"
import Journey from "../Journey/Journey"

import { apps } from "../../data/apps"

function Desktop() {

    const [openWindows, setOpenWindows] = useState([])
    const [highestZ, setHighestZ] = useState(1)
    const [theme, setTheme] = useState(

        localStorage.getItem("devos-theme") || "red"

    )

    useEffect(() => {

        document.body.className = theme

    }, [theme])

    function handleOpen(app) {

        const alreadyOpen = openWindows.find(
            window => window.id === app.id
        )

        if (alreadyOpen) {

            bringToFront(app.id)

            return
        }

        setOpenWindows(prev => [

            ...prev,

            {
                ...app,
                zIndex: highestZ,
                minimized: false
            }

        ])

        setHighestZ(prev => prev + 1)
    }

    function handleClose(id) {

        setOpenWindows(prev =>
            prev.filter(
                window => window.id !== id
            )
        )

    }

    function handleMinimize(id) {

        setOpenWindows(prev =>

            prev.map(window =>

                window.id === id

                    ? {
                        ...window,
                        minimized: true
                    }

                    : window

            )

        )

    }

    function bringToFront(id) {

        setOpenWindows(prev =>

            prev.map(window =>

                window.id === id

                    ? {
                        ...window,
                        zIndex: highestZ,
                        minimized: false
                    }

                    : window

            )

        )

        setHighestZ(prev => prev + 1)

    }

    function changeTheme(selectedTheme) {

        setTheme(selectedTheme)

        localStorage.setItem(
            "devos-theme",
            selectedTheme
        )

    }

    return (

        <div className="desktop">

            <div className="desktop-icons">

                {apps.map((app) => (

                    <Icon
                        key={app.id}
                        icon={app.icon}
                        title={app.title}
                        onClick={() => handleOpen(app)}
                    />

                ))}

            </div>

            {openWindows
                .filter(window => !window.minimized)
                .map((window) => (

                    <Window
                        key={window.id}
                        title={window.title}
                        zIndex={window.zIndex}
                        onFocus={() => bringToFront(window.id)}
                        onClose={() => handleClose(window.id)}
                        onMinimize={() => handleMinimize(window.id)}
                    >

                        {window.title === "About" && (
                            <>
                                <h2>Sobre mim</h2>
                                <p>Olá, eu sou Theo 👋</p>
                            </>
                        )}

                        {window.title === "Projects" && (

                            <Projects />

                        )}

                        {window.title === "Terminal" && (

                            <Terminal />

                        )}

                        {window.title === "Settings" && (

                            <Settings
                                changeTheme={changeTheme}
                            />

                        )}

                        {window.title === "Journey" && (

                            <Journey />

                        )}

                    </Window>

                ))}

            <Taskbar
                openWindows={openWindows}
                onFocus={bringToFront}
            />

        </div>

    )

}

export default Desktop