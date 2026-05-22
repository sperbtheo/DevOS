import "./BootScreen.css"
import { useEffect, useState } from "react"

function BootScreen() {

    const [messages, setMessages] = useState([])

    const bootMessages = [
        "Initializing core...",
        "Loading desktop...",
        "Loading applications...",
        "Loading terminal...",
        "System Ready ✓"
    ]

    useEffect(() => {

        let index = 0

        const interval = setInterval(() => {

            setMessages(prev => [
                ...prev,
                bootMessages[index]
            ])

            index++

            if (index >= bootMessages.length) {
                clearInterval(interval)
            }

        }, 600)

        return () => clearInterval(interval)

    }, [])

    return (

        <div className="boot-screen">

            <div className="boot-content">

                <h1>DevOS</h1>

                <span>v0.1 Alpha</span>

                <div className="boot-log">

                    {messages.map((msg, index) => (
                        <p key={index}>
                            {msg}
                        </p>
                    ))}

                </div>

            </div>

        </div>

    )
}

export default BootScreen