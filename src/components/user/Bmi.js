import React, {useState} from "react";
import DashboardSidebar from "./DashboardSidebar";
import Form from "../commons/elements/form/Form";
import InputGroup from "../commons/elements/form/InputGroup";

const Bmi = () => {
    const [height, setHeight] = useState(1);
    const [weight, setWeight] = useState(1);
    const [bmi, setBmi] = useState();
    const [category, setCategory] = useState();
    const [verdict, setVerdict] = useState()

    const calculateBmi = (e) => {
        e.preventDefault();
        let result = (weight / Math.pow((height / 100), 2)).toFixed(2);
        setBmi(result);
        // Set BMI category
        if (result < 16) {
            setCategory("Underweight (Severe thinness)");
            setVerdict("This might indicate severe malnutrition and/or an eating disorder. You should eat more calories and check in with a doctor.")
        } else if (result < 17 && result >= 16) {
            setCategory("Underweight (Moderate thinness)");
            setVerdict("This might indicate some degree of malnutrition. It is recommended to eat and exercise more.")
        } else if (result < 18.5 && result >= 17) {
            setCategory("Underweight (Mild thinness)");
            setVerdict("You are slightly thin. A tad more calories a day and a touch more exercising should put you in shape.")
        } else if (result < 25 && result >= 18.5) {
            setCategory("Normal range");
            setVerdict("You are in shape! Keep it up!")
        } else if (result < 30 && result >= 25) {
            setCategory("Overweight (Pre-obese)");
            setVerdict("You are slightly overweight. You should cut down on the fat intake.")
        } else if (result < 35 && result >= 30) {
            setCategory("Obese (Class I)");
            setVerdict("You are overweight. It is recommended to eat healthier and exercise more.")
        } else if (result < 40 && result >= 35) {
            setCategory("Obese (Class II)");
            setVerdict("You are severely obese. You should eat healthier and check in with a doctor.")
        } else if (result >= 40) {
            setCategory("Obese (Class II)");
            setVerdict("You are morbidly obese. Please check in with a doctor.")
        }
    }

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <section>
                        <header className="section-header">
                            <h1>Your BMI</h1>
                            <i>Calculate your BMI (body mass index) with your body stats. You can choose to save them
                                for use with other features.</i>
                        </header>
                        <div className="section-content">
                            <div className="bmi-result">
                                {bmi ?
                                    <>
                                        <h1>Your BMI is {bmi} {category && <>- {category}</>}</h1>
                                        {verdict && <p>{verdict}</p>}
                                    </>
                                    :
                                    <i>Input your height and weight below to get started.</i>
                                }
                            </div>
                            <Form onSubmit={calculateBmi}>
                                <InputGroup>
                                    <label>Height (cm)
                                        <input aria-label="Your height" type="number"
                                               value={height} min={1}
                                               onChange={e => setHeight(e.target.value)}/>
                                    </label>
                                    <label>Weight (kg)
                                        <input aria-label="Your weight" type="number"
                                               value={weight} min={1}
                                               onChange={e => setWeight(e.target.value)}/>
                                    </label>
                                </InputGroup>
                                <button type="submit" className="button-submit">Calculate your BMI</button>
                            </Form>
                        </div>
                    </section>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Bmi;