import React from "react"

export default function Die(props): React.JSX.Element {

    return (
        <div className="die-style">
            <h1>{props.value}</h1>
        </div>
    );
}