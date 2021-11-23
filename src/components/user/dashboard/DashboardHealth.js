import React, {useState, useEffect} from "react";
import LocalizedStrings from "react-localization";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";


const DashboardHealth = ({user}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            lowRoutine: "Low intensity - office work or similar, no workout.",
            averageRoutine: "Average intensity - manual labor and/or semi-regular workouts",
            highRoutine: "High intensity -  hobbyist athlete and/or daily workouts",
            extremeRoutine: "Extreme intensity - professional athlete",
            severeUnderweightBody: "Underweight (Severe thinness)",
            moderateUnderweightBody: "Underweight (Moderate thinness)",
            mildUnderweightBody: "Underweight (Mild thinness)",
            normalRangeBody: "Normal range",
            preOverweightBody: "Overweight (Pre-obese)",
            class1ObeseBody: "Obese (Class I)",
            class2ObeseBody: "Obese (Class II)",
            class3ObeseBody: "Obese (Class III)",
            severeUnderweightVerdict: "This might indicate severe malnutrition and/or an eating disorder. You should eat more calories and check in with a doctor.",
            moderateUnderweightVerdict: "This might indicate some degree of malnutrition. It is recommended to eat and exercise more.",
            mildUnderweightVerdict: "You are slightly thin. A tad more calories a day and a touch more exercising should put you in shape.",
            normalRangeVerdict: "You are in shape! Keep it up!",
            preOverweightVerdict: "You are slightly overweight. You should cut down on the fat intake.",
            class1ObeseVerdict: "You are overweight. It is recommended to eat healthier and exercise more.",
            class2ObeseVerdict: "You are severely obese. You should eat healthier and check in with a doctor.",
            class3ObeseVerdict: "You are morbidly obese. Please check in with a doctor.",
            healthProfile: "Your health profile",
            editButton: "Edit",
            bmiMessage: "Your BMI is",
            birthdate: "Date of birth",
            gender: "Gender",
            height: "Height",
            weight: "Weight",
            workoutRoutine: "Workout routine",
            generateMenuButton: "Let us suggest your menu",
            notEnoughHealth: "Share with us some details about you, so that we may recommend recipes that suit you best",
            noHealth: "Get started",
            yearsOld: "years old"
        },
        vi: {
            lowRoutine: "Ít vận động - làm việc văn phòng, không thể thao.",
            averageRoutine: "Vận động vừa phải - lao động chân tay hoặc thỉnh thoảng tập luyện.",
            highRoutine: "Vận động thường xuyên - người có sở thích thể thao hoặc luyện tập hằng ngày.",
            extremeRoutine: "Vận động cường độ nặng - vận động viên chuyên nghiệp.",
            severeUnderweightBody: "Thiếu cân nghiêm trọng.",
            moderateUnderweightBody: "Thiếu cân vừa phải.",
            mildUnderweightBody: "Thiếu cân nhẹ.",
            normalRangeBody: "Cân nặng bình thường.",
            preOverweightBody: "Tiền thừa cân.",
            class1ObeseBody: "Béo phì độ 1.",
            class2ObeseBody: "Béo phì độ 2.",
            class3ObeseBody: "Béo phì độ 3.",
            severeUnderweightVerdict: "Bạn đang bị suy dinh dưỡng hoặc rối loạn ăn uống. Bạn cần ăn nhiều calo hơn và tìm bác sĩ kiểm tra sức khỏe của bạn.",
            moderateUnderweightVerdict: "Bạn đang bị suy dinh dưỡng. Bạn cần ăn nhiều hơn và tập thể dục thường xuyên.",
            mildUnderweightVerdict: "Bạn đang thiếu cân. Hãy nạp nhiều calo hơn và tập thể dục để có được một cơ thể khỏe mạnh.",
            normalRangeVerdict: "Bạn đang có một cơ thể khỏe mạnh! Hãy giữ vững nó nhé!",
            preOverweightVerdict: "Bạn đang thừa cân. Bạn nên giảm lượng chất béo.",
            class1ObeseVerdict: "Bạn đang béo phì độ 1. Hãy ăn uống lành mạnh hơn và thường xuyên tập thể dục.",
            class2ObeseVerdict: "Bạn đang béo phì độ 2. Hãy ăn uống lành mạnh hơn nữa và tìm bác sĩ để kiểm tra sức khỏe của bạn.",
            class3ObeseVerdict: "Bạn đang béo phì độ 3. Hãy tìm bác sĩ để kiểm tra sức khỏe của bạn ngay.",
            healthProfile: "Hồ sơ sức khỏe",
            editButton: "Chỉnh sửa",
            bmiMessage: "Chỉ số BMI của bạn là",
            birthdate: "Ngày sinh",
            gender: "Giới tính",
            height: "Chiều cao",
            weight: "Cân nặng",
            workoutRoutine: "Cường độ tập luyện",
            generateMenuButton: "Đề xuất thực đơn cho bạn",
            notEnoughHealth: "Hãy chia sẻ với chúng tôi một số thông tin để có thể đề xuất các công thức phù hợp hơn với bạn",
            noHealth: "Bắt đầu ngay",
            yearsOld: "tuổi"
        }
    });

    const today = new Date;
    const birthdate = new Date(user.birth_date);
    let ageYear = today.getFullYear() - birthdate.getFullYear();
    let ageMonth = today.getMonth() - birthdate.getMonth();
    if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < birthdate.getDate())) {
        ageYear--;
    }

    const [bmi, setBmi] = useState();
    const [bodyType, setBodyType] = useState();
    const [verdict, setVerdict] = useState()
    const routines = [
        strings.lowRoutine,
        strings.averageRoutine,
        strings.highRoutine,
        strings.extremeRoutine
    ]
    let routine = null;
    if (user.workout_routine !== null) {
        if (user.workout_routine === 1) {
            routine = routines[0];
        } else if (user.workout_routine === 2) {
            routine = routines[1];
        } else if (user.workout_routine === 3) {
            routine = routines[2];
        } else if (user.workout_routine === 4) {
            routine = routines[3];
        }
    }

    const calculateBmi = () => {
        let result = (user.weight / Math.pow((user.height / 100), 2)).toFixed(2);
        setBmi(result);
        // Set BMI category
        if (user.weight === 0 || user.height === 0) {
            setBodyType();
            setVerdict();
        } else if (result < 16) {
            setBodyType(strings.severeUnderweightBody);
            setVerdict(strings.severeUnderweightVerdict)
        } else if (result < 17 && result >= 16) {
            setBodyType(strings.moderateUnderweightBody);
            setVerdict(strings.moderateUnderweightVerdict)
        } else if (result < 18.5 && result >= 17) {
            setBodyType(strings.mildUnderweightBody);
            setVerdict(strings.mildUnderweightVerdict)
        } else if (result < 25 && result >= 18.5) {
            setBodyType(strings.normalRangeBody);
            setVerdict(strings.normalRangeVerdict)
        } else if (result < 30 && result >= 25) {
            setBodyType(strings.preOverweightBody);
            setVerdict(strings.preOverweightVerdict)
        } else if (result < 35 && result >= 30) {
            setBodyType(strings.class1ObeseBody);
            setVerdict(strings.class1ObeseVerdict)
        } else if (result < 40 && result >= 35) {
            setBodyType(strings.class2ObeseBody);
            setVerdict(strings.class2ObeseVerdict)
        } else if (result >= 40) {
            setBodyType(strings.class3ObeseBody);
            setVerdict(strings.class3ObeseVerdict)
        }
    }
    useEffect(calculateBmi, [user.height, user.weight]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>{strings.healthProfile}</h1>
                <Link to="/health/details"><FaAngleRight/>{strings.editButton}</Link>
            </header>
            <div className="section-content">
                {bmi &&
                <div>
                    {bodyType && <h1>{strings.bmiMessage} {bmi}  <>- {bodyType}</>
                    </h1>}
                    {verdict && <p>{verdict}</p>}
                </div>}
                <ul style={{paddingTop: "20px"}}>
                    {user.birth_date &&
                    <li><span style={{fontWeight: "bold"}}>{strings.birthdate}:</span> {user.birth_date} ({ageYear} {strings.yearsOld})
                    </li>}
                    {user.gender &&
                    <li><span style={{fontWeight: "bold"}}>{strings.gender}:</span> {user.gender} </li>}
                    {user.height > 0 &&
                    <li><span style={{fontWeight: "bold"}}>{strings.height}:</span> {user.height} cm </li>}
                    {user.weight > 0 &&
                    <li><span style={{fontWeight: "bold"}}>{strings.weight}:</span> {user.weight} kg </li>}
                    {user.workout_routine > 0 &&
                    <li><span style={{fontWeight: "bold"}}>{strings.workoutRoutine}:</span> {routine} </li>}
                </ul>
                {user.birth_date && user.gender
                && user.height > 0 && user.weight > 0
                && user.workout_routine > 0 ?
                    <Link to="/menu">{strings.generateMenuButton} <FaAngleRight/></Link>
                    : <><em>{strings.notEnoughHealth}</em>
                        <Link to="/health">{strings.noHealth}<FaAngleRight/></Link></>}

            </div>
        </section>
    )
}

export default DashboardHealth;