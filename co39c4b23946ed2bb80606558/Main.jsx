// Main.jsx
import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromChefClaude } from "./ai.js"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        ["all the main spices", "pasta", "ground beef", "tomato paste"]
    );
    const [recipe, setRecipe] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    
    function addIngredient(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient");
        if (newIngredient.trim()) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()]);
            event.target.reset();
        }
    }

    async function handleGetRecipe() {
        setIsLoading(true);
        setRecipe("");
        try {
            const newRecipe = await getRecipeFromChefClaude(ingredients);
            setRecipe(newRecipe);
        } catch (error) {
            console.error("Error fetching recipe:", error);
            setRecipe("Sorry, something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    onGetRecipe={handleGetRecipe}
                    isLoading={isLoading}
                />
            }

            {(recipe || isLoading) && <ClaudeRecipe recipe={recipe} isLoading={isLoading} />}
        </main>
    )
}
