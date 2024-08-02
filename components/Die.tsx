import React from "react"

export default function Die(props): React.JSX.Element {
    const selected: boolean = props.value.selected;

    const dieStyle: string = selected ? "die-style-selected" : "die-style-unselected"

    return (
        <div className={dieStyle}>
            <h1>{props.value.dieValue}</h1>
        </div>
    );
}