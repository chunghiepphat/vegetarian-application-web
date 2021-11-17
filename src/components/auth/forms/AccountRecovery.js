import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import RecoveryStep1 from "./recovery/RecoveryStep1";
import RecoveryStep2 from "./recovery/RecoveryStep2";
import RecoveryStep3 from "./recovery/RecoveryStep3";

const AccountRecovery = ({email, setEmail}) => {
    const history = useHistory();
    const [step, setStep] = useState(1);

    return (
        <div className="auth-section">
            {step === 1 &&
            <RecoveryStep1 history={history} email={email} setEmail={setEmail} setStep={setStep}/>}
            {step === 2 &&
            <RecoveryStep2 history={history} email={email} setStep={setStep}/>}
            {step === 3 &&
            <RecoveryStep3 history={history} email={email} setStep={setStep}/>}
        </div>
    )

}

export default AccountRecovery;