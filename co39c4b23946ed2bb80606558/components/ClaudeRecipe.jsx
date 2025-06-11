// ClaudeRecipe.jsx
export default function ClaudeRecipe({ recipe, isLoading }) {
    return (
        <section>
            <h2>Ron Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                {isLoading ? (
                    <p>Thinking... We are creating your recipe...</p>
                ) : (
                    <p dangerouslySetInnerHTML={{ __html: recipe.replace(/\n/g, "<br/>") }} />
                )}
            </article>
        </section>
    );
}
