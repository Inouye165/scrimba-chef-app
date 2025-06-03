import React from "react"

export default function App() {
    const [isImportant, func] = React.useState("Yes")
    console.log(isImportant)
    
    return (
        <main>
            <h1 className="title">Is state important to know?</h1>
            <button className="value">{isImportant}</button>
        </main>
    )
}
