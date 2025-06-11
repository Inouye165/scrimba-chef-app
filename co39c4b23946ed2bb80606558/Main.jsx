import React from "react"
import ReactMarkdown from "react-markdown"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if (newIngredient.trim()) {
            setIngredients(prev => [...prev, newIngredient.trim()])
        }
    }

async function getRecipe() {
    setLoading(true)
    console.log("Sending ingredients:", ingredients)

    try {
        const response = await fetch("http://localhost:3001/api/claude", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ingredients })
        })

        const data = await response.json()
        console.log("API response:", data)

        setRecipe(data.text || "No recipe returned.")

    } catch (err) {
        console.error("Failed to fetch recipe:", err)
        setRecipe("Error fetching recipe.")
    } finally {
        setLoading(false)
    }
}

    return (
        <main>

<form
    onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newIngredient = formData.get("ingredient")
        if (newIngredient.trim()) {
            setIngredients(prev => [...prev, newIngredient.trim()])
        }
        e.target.reset()
    }}
    className="add-ingredient-form"
>
    <input
        type="text"
        placeholder="e.g. oregano"
        aria-label="Add ingredient"
        name="ingredient"
    />
    <button type="submit">Add ingredient</button>
</form>

            {ingredients.length > 0 && (
                <section>
                    <h2>Ingredients on hand:</h2>
<ul>
  {ingredients.map((item, index) => (
    <li key={item}>
      {item}
      <button
        onClick={() =>
          setIngredients(prev => prev.filter((_, i) => i !== index))
        }
        aria-label={`Remove ${item}`}
        style={{ marginLeft: "0.5em" }}
      >
        ❌
      </button>
    </li>
  ))}
</ul>
                    <button onClick={getRecipe}>Get a recipe</button>
                </section>
            )}

            {loading && <p>Loading...</p>}

            {recipe && (
                <section className="recipe-display">
                    <h2>Recipe</h2>
                    <ReactMarkdown>{recipe}</ReactMarkdown>
                </section>
            )}
        </main>
    )
}
