import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";
import {FaAngleLeft} from "react-icons/fa";
import {ImCross} from "react-icons/all";
import LocalizedStrings from "react-localization";

const RecipeStep03 = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            step3Header: "Step 3 - Add your ingredients",
            step3MessageHeader: "Add some ingredients and their estimated amounts. Concise and precise ingredient names help us estimate the nutritional values for your recipe better.",
            previousStepButton: "Previous step",
            ingredientHeader: "Name an ingredient and its amount (in grams)",
            ingredientMessage: "Add some ingredients to your recipe...",
            ingredientPlaceholder: "e.g: lettuce, tomato, basil,...",
            addIngredientButton: "Add ingredient",
            clearButton: "Clear",
            nextStepButton: "Next step",
        },
        vi: {
            step3Header: "Bước 3 - Thêm nguyên liệu",
            step3MessageHeader: "Thêm nguyên liệu vào ước tính số lượng, đặt tên nguyên liệu ngắn gọn và chính xác để chúng tôi ước lượng chỉ số dinh dưỡng cho công thức của bạn",
            previousStepButton: "Bước trước",
            ingredientHeader: "Thêm nguyên liệu và số lượng (tính theo gam)",
            ingredientMessage: "Thêm nguyên liệu cho công thức...",
            ingredientPlaceholder: "ví dụ: cải bông, cà chua, húng quế,...",
            addIngredientButton: "Thêm nguyên liệu",
            clearButton: "Xóa",
            nextStepButton: "Bước tiếp theo",
        }
    });

    const history = useHistory();
    const handleAddField = (e) => {
        e.preventDefault();
        const ingredient = {
            ingredient_name: "",
            amount_in_mg: "1",
        }
        props.setIngredients((prev) => [...prev, ingredient]);
    }
    const handleRemoveField = (e, index) => {
        e.preventDefault();
        props.setIngredients((prev) => prev.filter((item) => item !== prev[index]));
    }
    const handleClear = (e) => {
        e.preventDefault();
        props.setIngredients([]);
    }
    const handleChange = (e, index) => {
        e.preventDefault();
        e.persist();
        props.setIngredients((prev) => {
            return prev.map((item, i) => {
                if (i !== index) {
                    return item;
                }
                return {
                    ...item, [e.target.name]: e.target.value,
                };
            });
        });
    }
    const nextStep = () => {
        history.push("/post/recipe/step-4");
    }
    useEffect(() => {
        console.log(props.ingredients)
    }, [props.ingredients])

    return (
        <section>
            <header className="section-header">
                <Link to="/post/recipe/step-2"><FaAngleLeft/>{strings.previousStepButton}</Link>
                <h1>{strings.step3Header}</h1>
                <p>{strings.step3MessageHeader}</p>
            </header>
            <div className="section-content">
                <Form onSubmit={nextStep}>
                    <h1>{strings.ingredientHeader}</h1>
                    {props.ingredients.length > 0 ?
                        <div className="form-dynamic">
                            {props.ingredients.map((item, index) => (
                                <InputGroup key={index}>
                                    <input name="ingredient_name" type="text"
                                           value={item.ingredient_name}
                                           onChange={(e) => handleChange(e, index)}
                                           placeholder={strings.ingredientPlaceholder} required/>
                                    <input name="amount_in_mg" type="number"
                                           value={item.amount_in_mg} min={1}
                                           onChange={(e) => handleChange(e, index)}/>
                                    <button className="button-remove" onClick={(e) => handleRemoveField(e, index)}>
                                        <ImCross/>
                                    </button>
                                </InputGroup>
                            ))}
                        </div>
                        : <em>{strings.ingredientMessage}</em>}
                    <div className="sticky-bottom">
                        <InputGroup>
                            <button className="button-light" onClick={handleAddField}>{strings.addIngredientButton}</button>
                            {props.ingredients.length > 0 ? <>
                                <button className="button-light" onClick={handleClear}>{strings.clearButton}</button>
                                <button type="submit" className="button-dark"> {strings.nextStepButton}</button>
                            </> : <>
                                <button disabled>{strings.clearButton}</button>
                                <button disabled>{strings.nextStepButton}</button>
                            </>}
                        </InputGroup>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default RecipeStep03;