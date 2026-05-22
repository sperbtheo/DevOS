import "./Settings.css"

function Settings({ changeTheme }) {

    const themes = [

        {
            name: "Red Cyber",
            color: "#ff3b5c",
            theme: "red"
        },

        {
            name: "Blue Neon",
            color: "#00aaff",
            theme: "blue"
        },

        {
            name: "Purple Matrix",
            color: "#9b59ff",
            theme: "purple"
        }

    ]

    return (

        <div className="settings">

            <h2>
                Personalização
            </h2>

            <div className="theme-list">

                {themes.map((theme) => (

                    <button
                        key={theme.theme}
                        className="theme-button"
                        onClick={() => changeTheme(theme.theme)}
                    >

                        <span
                            style={{
                                background: theme.color
                            }}
                        />

                        {theme.name}

                    </button>

                ))}

            </div>

        </div>

    )

}

export default Settings