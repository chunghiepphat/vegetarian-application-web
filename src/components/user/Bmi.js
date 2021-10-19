import React, {useState} from "react";
import DashboardSidebar from "./DashboardSidebar";
import Form from "../commons/elements/form/Form";
import InputGroup from "../commons/elements/form/InputGroup";

const Bmi = () => {
    const [height, setHeight] = useState(1);
    const [weight, setWeight] = useState(1);
    const [bmi, setBmi] = useState();

    const calculateBmi = (e) => {
        e.preventDefault();
        let result = (weight / Math.pow((height / 100), 2)).toFixed(2);
        setBmi(result);
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
                                    <p>Your BMI is {bmi}</p>
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