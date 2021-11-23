import React from "react";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";
import LocalizedStrings from "react-localization";

const RecipeStep01 = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            step1Header: "Step 1 - Getting started",
            step1MessageHeader: "Share with us some details about your new exciting recipe.",
            nameRecipe: "Name your recipe (*)",
            namePlaceholder: "What would you call this dish?",
            typeRecipe: "Recipe type",
            difficultyRecipe: "Recipe difficulty",
            portionRecipe: "Portion",
            servingsRecipe: "servings",
            piecesRecipe: "pieces",
            prepRecipe: "Prep time (minutes)",
            bakingRecipe: "Baking time (minutes)",
            restingRecipe: "Resting time (minutes)",
            clearButton: "Clear",
            nextStepButton: "Next step"
        },
        vi: {
            step1Header: "Bước 1 - Bắt đầu",
            step1MessageHeader: "Chia sẻ với chúng tôi đôi chút về công thức của bạn",
            nameRecipe: "Tên công thức (*)",
            namePlaceholder: "Bạn sẽ gọi món này là gì?",
            typeRecipe: "Loại",
            difficultyRecipe: "Độ khó",
            portionRecipe: "Khẩu phần ăn",
            servingsRecipe: "phần ăn",
            piecesRecipe: "miếng",
            prepRecipe: "Thời gian chuẩn bị (phút)",
            bakingRecipe: "Thời gian nướng (phút)",
            restingRecipe: "Thời gian nghỉ (phút)",
            clearButton: "Xóa",
            nextStepButton: "Bước tiếp theo"
        }
    });

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const clearInput = (e) => {
        e.preventDefault();
        props.setTitle("");
        props.setCategory(1);
        props.setDifficulty(1);
        props.setPortionSize(1);
        props.setPortionType(1);
        props.setPrepTime(0);
        props.setBakingTime(0);
        props.setRestingTime(0);
    }
    const nextStep = () => {
        props.history.push("/post/recipe/step-2");
    }

    return (
        <section>
            <header className="section-header">
                <h1>{strings.step1Header}</h1>
                <em>{strings.step1MessageHeader}</em>
            </header>
            <div className="section-content">
                <Form onSubmit={nextStep}>
                    <label>{strings.nameRecipe}
                        <input aria-label="Recipe title" type="text" value={props.title}
                               onChange={e => props.setTitle(capitalizeFirstLetter(e.target.value))}
                               placeholder={strings.namePlaceholder} required/>
                    </label>
                    <label>{strings.typeRecipe}
                        <select aria-label="Recipe type" value={props.category}
                                onChange={e => props.setCategory(e.target.value)}>
                            {props.categoryList && props.categoryList.map(item => (
                                <option value={item.category_id}>{item.category_name}</option>
                            ))}}
                        </select>
                    </label>
                    <label>{strings.difficultyRecipe}</label>
                    <InputGroup>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="1" defaultChecked
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">Beginner</span> </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="2"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">Novice</span> </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="3"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">Cook</span> </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="4"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">Chef</span> </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="5"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">Gordon Ramsay</span> </label>
                    </InputGroup>
                    <label>{strings.portionRecipe}
                        <InputGroup>
                            <input aria-label="Portion size" type="number" min={1} value={props.portionSize}
                                   onChange={e => props.setPortionSize(e.target.value)}/>
                            <select aria-label="Portion type" value={props.portionType}
                                    onChange={e => props.setPortionType(e.target.value)}
                                    style={{maxWidth: "200px"}}>
                                <option value="1">{strings.servingsRecipe}</option>
                                <option value="2">{strings.piecesRecipe}</option>
                            </select> </InputGroup> </label>
                    <label>{strings.prepRecipe}
                        <InputGroup>
                            <input aria-label="Prep time" type="number" min={0} value={props.prepTime}
                                   onChange={e => props.setPrepTime(e.target.value)}/> </InputGroup> </label>
                    <label>{strings.bakingRecipe}
                        <InputGroup>
                            <input aria-label="Baking time" type="number" min={0} value={props.bakingTime}
                                   onChange={e => props.setBakingTime(e.target.value)}/> </InputGroup> </label>
                    <label>{strings.restingRecipe}
                        <InputGroup>
                            <input aria-label="Resting time" type="number" min={0} value={props.restingTime}
                                   onChange={e => props.setRestingTime(e.target.value)}/> </InputGroup> </label>
                    <div className="sticky-bottom">
                        <InputGroup>
                            <button className="button-light" onClick={clearInput}>{strings.clearButton}</button>
                            <button type="submit" className="button-dark">
                                {strings.nextStepButton}
                            </button>
                        </InputGroup>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default RecipeStep01;