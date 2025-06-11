export async function getRecipeFromChefClaude(ingredients) {
    try {
        const response = await fetch("http://localhost:3001/api/claude", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ingredients })
        });

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Proxy API error:", error);
        return "Sorry, something went wrong fetching the recipe.";
    }
}