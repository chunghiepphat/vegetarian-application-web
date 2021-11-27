import LocalizedStrings from "react-localization";

export let genericStrings = new LocalizedStrings({
    en: {
        beginner: "Beginner",
        novice: "Novice",
        cook: "Cook",
        chef: "Chef",
        gordonRamsay: "Gordon Ramsay",
        per: "per",
        servings: "serving(s)",
        pieces: "piece(s)",
        grams: "(grams)",
        minutes: "minute(s)",
        protein: "Protein (mg)",
        fat: "Fat (mg)",
        carb: "Carbohydrates (mg)",
        calories: "Calories (cal)",
        lastEdited: "Last edited",
        male: "Male",
        female: "Female",
    },
    vi: {
        beginner: "Vào nghề",
        novice: "Tập sự",
        cook: "Nội trợ",
        chef: "Đầu bếp",
        gordonRamsay: "Gordon Ramsay",
        per: "cho",
        servings: "khẩu phần ăn",
        pieces: "miếng",
        grams: "(gam)",
        minutes: "phút",
        protein: "Chất đạm (mg)",
        fat: "Chất béo (mg)",
        carb: "Carb (mg)",
        calories: "Calo (cal)",
        lastEdited: "Chỉnh sửa lần cuối",
        male: "Nam",
        female: "Nữ",
    }
})

export let profileStrings = new LocalizedStrings({
    en: {
        // Profile
        birthdate: "Date of birth",
        gender: "Gender",
        height: "Height",
        weight: "Weight",
        yearsOld: "years old",
        // Health & routine
        workoutRoutine: "Workout routine",
        routineLowIntensity: "Low intensity - office work or similar, no workout.",
        routineAverageIntensity: "Average intensity - manual labor and/or semi-regular workouts",
        routineHighIntensity: "High intensity -  hobbyist athlete and/or daily workouts",
        routineExtremeIntensity: "Extreme intensity - professional athlete",
        bmiSevereThinness: "Underweight (Severe thinness)",
        bmiModerateThinness: "Underweight (Moderate thinness)",
        bmiMildThinness: "Underweight (Mild thinness)",
        bmiNormal: "Normal range",
        bmiPreObese: "Overweight (Pre-obese)",
        bmiObese1: "Obese (Class I)",
        bmiObese2: "Obese (Class II)",
        bmiObese3: "Obese (Class III)",
        bmiSevereThinnessVerdict: "This might indicate severe malnutrition and/or an eating disorder. You should eat more calories and check in with a doctor.",
        bmiModerateThinnessVerdict: "This might indicate some degree of malnutrition. It is recommended to eat and exercise more.",
        bmiMildThinnessVerdict: "You are slightly thin. A tad more calories a day and a touch more exercising should put you in shape.",
        bmiNormalVerdict: "You are in shape! Keep it up!",
        bmiPreObeseVerdict: "You are slightly overweight. You should cut down on the fat intake.",
        bmiObese1Verdict: "You are overweight. It is recommended to eat healthier and exercise more.",
        bmiObese2Verdict: "You are severely obese. You should eat healthier and check in with a doctor.",
        bmiObese3Verdict: "You are morbidly obese. Please check in with a doctor.",
    },
    vi: {
        // Profile
        birthdate: "Ngày sinh",
        gender: "Giới tính",
        height: "Chiều cao",
        weight: "Cân nặng",
        yearsOld: "tuổi",
        // Health & routine
        workoutRoutine: "Cường độ tập luyện",
        routineLowIntensity: "Ít vận động - làm việc văn phòng, không thể thao.",
        routineAverageIntensity: "Vận động vừa phải - lao động chân tay hoặc thỉnh thoảng tập luyện.",
        routineHighIntensity: "Vận động thường xuyên - người có sở thích thể thao hoặc luyện tập hằng ngày.",
        routineExtremeIntensity: "Vận động cường độ nặng - vận động viên chuyên nghiệp.",
        bmiSevereThinness: "Thiếu cân nghiêm trọng.",
        bmiModerateThinness: "Thiếu cân vừa phải.",
        bmiMildThinness: "Thiếu cân nhẹ.",
        bmiNormal: "Cân nặng bình thường.",
        bmiPreObese: "Tiền thừa cân.",
        bmiObese1: "Béo phì độ 1.",
        bmiObese2: "Béo phì độ 2.",
        bmiObese3: "Béo phì độ 3.",
        bmiSevereThinnessVerdict: "Bạn đang bị suy dinh dưỡng hoặc rối loạn ăn uống. Bạn cần ăn nhiều calo hơn và tìm bác sĩ kiểm tra sức khỏe của bạn.",
        bmiModerateThinnessVerdict: "Bạn đang bị suy dinh dưỡng. Bạn cần ăn nhiều hơn và tập thể dục thường xuyên.",
        bmiMildThinnessVerdict: "Bạn đang thiếu cân. Hãy nạp nhiều calo hơn và tập thể dục để có được một cơ thể khỏe mạnh.",
        bmiNormalVerdict: "Bạn đang có một cơ thể khỏe mạnh! Hãy giữ vững nó nhé!",
        bmiPreObeseVerdict: "Bạn đang thừa cân. Bạn nên giảm lượng chất béo.",
        bmiObese1Verdict: "Bạn đang béo phì độ 1. Hãy ăn uống lành mạnh hơn và thường xuyên tập thể dục.",
        bmiObese2Verdict: "Bạn đang béo phì độ 2. Hãy ăn uống lành mạnh hơn nữa và tìm bác sĩ để kiểm tra sức khỏe của bạn.",
        bmiObese3Verdict: "Bạn đang béo phì độ 3. Hãy tìm bác sĩ để kiểm tra sức khỏe của bạn ngay.",
    }
})
// Site-wide element display strings
export let headerStrings = new LocalizedStrings({
    en: {
        headerHome: "Home",
        headerAbout: "About",
        headerSearchPlaceholder: "What would you have for dinner?",
        headerProfile: "Your profile",
        headerSignIn: "Sign in",
        headerSignUp: "Sign up",
    },
    vi: {
        headerHome: "Trang chủ",
        headerAbout: "Giới thiệu",
        headerSearchPlaceholder: "Tối nay ăn gì?",
        headerProfile: "Hồ sơ",
        headerSignIn: "Đăng nhập",
        headerSignUp: "Đăng ký",
    }
});
export let footerStrings = new LocalizedStrings({
    en: {},
    vi: {}
});

// Article display strings
export let articleStatusStrings = new LocalizedStrings({
    en: {
        statusPending: "Waiting for review.",
        statusPendingShort: "Pending.",
        statusApproved: "Approved and public.",
        statusApprovedShort: "Approved",
        statusRejected: "Rejected by admin.",
        statusRejectedShort: "Rejected",
        statusDraft: "- - - DRAFT - - -",
    },
    vi: {
        statusPending: "Đang chờ duyệt.",
        statusPendingShort: "Chờ duyệt.",
        statusApproved: "Đã duyệt và công khai.",
        statusApprovedShort: "Đã duyệt",
        statusRejected: "Không được duyệt.",
        statusRejectedShort: "Không được duyệt",
        statusDraft: "- - - BẢN NHÁP - - -",
    }
});

// Alert strings
export let requestErrorStrings = new LocalizedStrings({
    en: {
        requestErrorUnauthorized: "You are not authorized to complete this request.",
        requestErrorStatus: "An error has occurred. Status code: ",
        requestErrorException: "There was an unexpected error. ",
        hostingServiceErrorStatus: "We couldn't reach our hosting services. Status code: ",
    },
    vi: {
        requestErrorUnauthorized: "Bạn không được cấp quyền để thực hiện việc đó.",
        requestErrorStatus: "Đã có lỗi xảy ra. Mã lỗi: ",
        requestErrorException: "Đã có lỗi bất ngờ. ",
        hostingServiceErrorStatus: "Chúng tôi không thể kết nối với máy chủ. Mã lỗi: ",
    }
});