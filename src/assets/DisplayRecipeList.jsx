export default function DisplayRecipeList(props) {

    const basicInfo = props.recipes.map((recipe, index) => {
        const link = `/recipe/${recipe.name}`;
        return (
            <li key={index}>
                <a href={link}>{recipe.name}</a> - {recipe.keywords.join(", ")}
            </li>
    )});


    return (
        <ul>
            {basicInfo}
        </ul>
    );
}