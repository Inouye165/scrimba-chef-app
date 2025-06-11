// ClaudeRecipe.jsx
export default function ClaudeRecipe({ recipe, isLoading }) {
    return (
        <section>
            <h2>Chef Claude Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                {isLoading ? (
                    <p>Thinking... Chef Claude is creating your recipe...</p>
                ) : (
                    <p dangerouslySetInnerHTML={{ __html: recipe.replace(/\n/g, "<br/>") }} />
                )}
            </article>
        </section>
    );
}
