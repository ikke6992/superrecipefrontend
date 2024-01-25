export default function DisplayRecipeList(props) {

    const basicInfo = props.recipes.map((recipe, index) => {
        const link = `/recipe/${recipe.name}`;
        const keywords = recipe.keywords.map(keyword => keyword + ", ");
        return (
            <li key={index}>
                <a href={link}>{recipe.name}</a> - {keywords}
            </li>
    )});


    return (
        <ul>
            {basicInfo}
        </ul>
    );
}