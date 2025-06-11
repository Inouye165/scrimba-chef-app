// ai.js

// This async function simulates fetching a recipe from an AI.
// It waits for 1.5 seconds to mimic a real network delay.
export async function getRecipeFromChefClaude(ingredients) {
    console.log("Simulating AI recipe generation for:", ingredients.join(", "));
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const recipeMarkdown = `
**Hearty Beef & Pasta Skillet**

A simple, delicious one-pan meal using your ingredients!

* Prep time: 5 minutes
* Cook time: 20 minutes

**Ingredients:**
* 1 lb ground beef
* 1 box of pasta
* 1 can of tomato paste
* Your collection of main spices (e.g., 1 tsp garlic powder, 1 tsp onion powder, 1 tsp dried oregano)
* 2 cups water or broth
* Salt and pepper to taste
* 1 tbsp olive oil

**Instructions:**
1. Cook pasta according to package directions. Drain and set aside.
2. In a large skillet, brown the ground beef over medium-high heat. Drain excess fat.
3. Stir in the tomato paste and your spices. Cook for 1 minute until fragrant.
4. Add the cooked pasta to the skillet and stir everything to combine.
5. Serve immediately, and enjoy your quick and easy meal!
`;
    // In a real app, this would be the actual response from the AI.
    return recipeMarkdown;
}

// You can leave a Mistral mock function here as well if needed.
export async function getRecipeFromMistral(ingredients) {
    // This function can be built out similarly if you choose to use it.
    console.log("Mistral function called with:", ingredients);
    return "Recipe from Mistral would appear here.";
}