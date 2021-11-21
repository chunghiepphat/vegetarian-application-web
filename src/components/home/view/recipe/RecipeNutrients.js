import React from "react";
import {AiFillThunderbolt, IoMdNutrition} from "react-icons/all";
import LocalizedStrings from "react-localization";

const RecipeNutrients = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Estimated nutritional values per serving",
            protein: "Protein (mg)",
            fat: "Fat (mg)",
            carb: "Carbohydrates (mg)",
            calories: "Calories (cal)",
            estimationDisclaimer: "These values are only rough estimates based on the ingredients of this recipe.",
            accuracyDisclaimer: "Be noted that these values might be inaccurate if we could not find nutritional values for one or more ingredients.",
            noNutrientsMessage: "It seems we couldn't calculate the nutritional values for this recipe...",
        },
        vi: {
            header: "Dinh dưỡng ước tính cho mỗi phần ăn",
            protein: "Chất đạm (mg)",
            fat: "Chất béo (mg)",
            carb: "Carb (mg)",
            calories: "Calo (cal)",
            estimationDisclaimer: "Những giá trị dinh dưỡng này được ước tính dựa trên các thành phần trong công thức.",
            accuracyDisclaimer: "Những giá trị này có thể thiếu chính xác nếu chúng tôi không thể tìm được giá trị dinh dưỡng của một hoặc nhiều thành phần.",
            noNutrientsMessage: "Có vẻ như chúng tôi không thể tính được giá trị dinh dưỡng cho công thức này...",
        }
    });

    return (
        <section className="article-list">
            {props.nutrients ? <>
                <h2>{strings.header}</h2>
                <ul>
                    {props.nutrients.protein > 0 && <li>
                        <IoMdNutrition/> {strings.protein}: {Math.round(props.nutrients.protein / props.portion)}
                    </li>}
                    {props.nutrients.fat > 0 && <li>
                        <IoMdNutrition/> {strings.fat}: {Math.round(props.nutrients.fat / props.portion)}
                    </li>}
                    {props.carb > 0 && <li>
                        <IoMdNutrition/> {strings.carb}: {Math.round(props.nutrients.carb / props.portion)}
                    </li>}
                    {props.nutrients.calories > 0 && <li>
                        <AiFillThunderbolt/> {strings.calories}: {Math.round(props.nutrients.calories / props.portion)}
                    </li>}
                </ul>
                <br/>
                <p><em>(*) {strings.estimationDisclaimer}</em></p>
                <p><em>(**) {strings.accuracyDisclaimer}</em></p>
            </> : <em>{strings.noNutrientsMessage}</em>}
        </section>
    )
}

export default RecipeNutrients;