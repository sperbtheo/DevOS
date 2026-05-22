import "./Terminal.css"
import { useState } from "react"

function Terminal() {

    const [input, setInput] = useState("")
    const [history, setHistory] = useState([])

    function executeCommand(e) {

        if (e.key !== "Enter") return

        let response = ""

        switch (input.toLowerCase()) {

            case "help":

                response = `
help
about
projects
skills
clear
`
                break

            case "about":

                response = `
Theo Sperb
Front-End Developer
Construindo o DevOS
`
                break

            case "projects":

                response = `
Elevate AI-CV
DevOS
`
                break

            case "skills":

                response = `
HTML
CSS
JavaScript
React
`
                break

            case "clear":

                setHistory([])
                setInput("")
                return

            default:

                response = `Comando não encontrado`
        }

        setHistory(prev => [
            ...prev,
            `Theo@DevOS:~ ${input}`,
            response
        ])

        setInput("")

    }

    return (

        <div className="terminal">

            {history.map((line, index) => (

                <p key={index}>
                    {line}
                </p>

            ))}

            <div className="terminal-input">

                <span>
                    Theo@DevOS:~
                </span>

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={executeCommand}
                />

            </div>

        </div>

    )

}

export default Terminal