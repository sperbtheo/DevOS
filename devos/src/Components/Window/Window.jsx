import "./Window.css"
import Draggable from "react-draggable"
import { useRef } from "react"

function Window({
    title,
    children,
    onClose,
    onMinimize,
    onFocus,
    onMaximize,
    zIndex,
    maximized
}) {

    const nodeRef = useRef(null)

    return (

        <Draggable
            handle=".window-header"
            nodeRef={nodeRef}
        >

            <div
                ref={nodeRef}
                className={`window ${maximized ? "maximized" : ""}`}

                style={{
                    zIndex
                }}
            >

                <div
                    className="window-header"
                    onMouseDown={onFocus}
                >

                    <div className="window-buttons">

                        <button onClick={onMinimize}>
                            −
                        </button>

                        <button onClick={onMaximize}>
                            {maximized ? "❐" : "□"}
                        </button>

                        <button onClick={onClose}>
                            ×
                        </button>

                    </div>

                    <span>{title}</span>

                </div>

                <div className="window-content">

                    {children}

                </div>

            </div>

        </Draggable>

    )

}

export default Window