import LocalizedStrings from "react-localization";

export let dashboardDisplayStrings = new LocalizedStrings({
    en: {
        // Common strings
        dashboardEdit: "Edit",
        dashboardViewAll: "View all",
        // Health section
        dashboardHealth: "Your personal index",
        dashboardHealthBmi: "Your BMI is",
        dashboardHealthSuggestMenu: "Let us suggest your menu",
        dashboardHealthCompleteProfile: "Share with us some details about you, so that we may recommend recipes that suit you best",
        dashboardHealthGetStarted: "Get started",
        // Recommendations section
        dashboardRecommendations: "Recommended daily nutrition consumption",
        dashboardRecommendationSubheader: "Based on your BMI, profile and routine.",
        // Recipes section
        dashboardRecipes: "Your recent recipes",
        dashboardRecipesEmpty: "It seems you haven't posted anything yet.",
        // Blogs section
        dashboardBlogs: "Your recent blogs",
        dashboardBlogsEmpty: "It seems you haven't posted anything yet.",
        // Sidebar
        dashboardSidebarMain: "Overview",
        dashboardSidebarMainDashboard: "Dashboard",
        dashboardSidebarMainWeeklyMenu: "Your weekly menu",
        dashboardSidebarMainFavoritePosts: "Your favorite posts",
        dashboardSidebarMainPostHistory: "Your post history",
        dashboardSidebarMainPostDrafts: "Your drafts",
        dashboardSidebarShare: "Something to share?",
        dashboardSidebarShareRecipe: "Share a recipe",
        dashboardSidebarPostVideo: "Share a video",
        dashboardSidebarPostBlog: "Share a story",
        dashboardSidebarSettings: "Tools & settings",
        dashboardSidebarSettingsHealth: "Manage health profile",
        dashboardSidebarSettingsFoodAllergies: "Manage food allergies",
        dashboardSidebarSettingsFoodPreferences: "Manage food preferences",
        dashboardSidebarSettingsAccount: "Edit account details",
    },
    vi: {
        // Common strings
        dashboardEdit: "Chỉnh sửa",
        dashboardViewAll: "Xem tất cả",
        // Health section
        dashboardHealth: "Thông số cá nhân",
        dashboardHealthBmi: "Chỉ số BMI của bạn là",
        dashboardHealthSuggestMenu: "Đề xuất thực đơn cho bạn",
        dashboardHealthCompleteProfile: "Hãy chia sẻ với chúng tôi một số thông tin để có thể đề xuất các công thức phù hợp hơn với bạn",
        dashboardHealthGetStarted: "Bắt đầu ngay",
        // Recommendations section
        dashboardRecommendations: "Lượng dinh dưỡng bạn cần cho mỗi ngày",
        recommendMessage: "Dựa vào chỉ số BMI, hồ sơ và thói quen sinh hoạt của bạn.",
        // Recipes section
        dashboardRecipes: "Các công thức gần đây",
        dashboardRecipesEmpty: "Bạn chưa có công thức nào.",
        // Blogs section
        dashboardBlogs: "Các bài viết gần đây",
        dashboardBlogsEmpty: "Bạn chưa có bài viết nào.",
        // Sidebar
        dashboardSidebarMain: "Tổng quan",
        dashboardSidebarMainDashboard: "Trang chính",
        dashboardSidebarMainWeeklyMenu: "Thực đơn của bạn",
        dashboardSidebarMainFavoritePosts: "Các bài đã thích",
        dashboardSidebarMainPostHistory: "Lịch sử đăng bài",
        dashboardSidebarMainPostDrafts: "Bản nháp đã lưu",
        dashboardSidebarShare: "Bạn muốn chia sẻ gì?",
        dashboardSidebarShareRecipe: "Chia sẻ công thức nấu ăn",
        dashboardSidebarPostVideo: "Chia sẻ video hướng dẫn",
        dashboardSidebarPostBlog: "Chia sẻ bài viết",
        dashboardSidebarSettings: "Công cụ và cài đặt",
        dashboardSidebarSettingsHealth: "Quản lý hồ sơ sức khỏe",
        dashboardSidebarSettingsFoodAllergies: "Quản lý thực phẩm dị ứng",
        dashboardSidebarSettingsFoodPreferences: "Quản lý thực phẩm yêu thích",
        dashboardSidebarSettingsAccount: "Chỉnh sửa tài khoản",
    }
})

export let favoritesDisplayStrings = new LocalizedStrings({
    en: {
        favoriteTabsRecipes: "Your favorite recipes",
        favoriteTabsVideos: "Your favorite video",
        favoriteTabsBlogs: "Your favorite blogs",
        favoriteRecipesHeader: "Recipes",
        favoriteRecipesSubheader: "Recipes you added to favorites will be shown here.",
        favoriteBlogsHeader: "Blogs",
        favoriteBlogsSubheader: "Stories you added to favorites will be shown here.",
    },
    vi: {
        favoriteTabsRecipes: "Công thức yêu thích",
        favoriteTabsVideos: "Video yêu thích",
        favoriteTabsBlogs: "Bài viết yêu thích",
        favoriteRecipesHeader: "Công thức",
        favoriteRecipesSubheader: "Công thức yêu thích của bạn sẽ được hiển thị ở đây.",
        favoriteBlogsHeader: "Bài viết",
        favoriteBlogsSubheader: "Bài viết yêu thích của bạn sẽ được hiển thị ở đây.",
    }
})

export let historyDisplayStrings = new LocalizedStrings({
    en: {
        historyTabsRecipes: "Your recipes",
        historyTabsVideos: "Your videos",
        historyTabsBlogs: "Your blogs",
        historyRecipesHeader: "Recipes",
        historyRecipesSubheader: "Your published recipes are shown here.",
        historyRecipesEmpty: "It seems you haven't posted anything yet.",
        historyVideosHeader: "Videos",
        historyVideosSubheader: "Your published videos tutorials.",
        historyVideosEmpty: "It seems you haven't posted anything yet.",
        historyBlogsHeader: "Blogs",
        historyBlogSubheader: "Your published blogs and stories.",
        historyBlogsEmpty: "It seems you haven't posted anything yet.",
    },
    vi: {
        historyTabsRecipes: "Công thức",
        historyTabsVideos: "Video",
        historyTabsBlogs: "Bài viết",
        historyRecipesHeader: "Công thức",
        historyRecipesSubheader: "Công thức mà bạn đã đăng.",
        historyRecipesEmpty: "Có vẻ như bạn chưa đăng công thức nào.",
        historyVideosHeader: "Video",
        historyVideosSubheader: "Video mà bạn đã đăng",
        historyVideosEmpty: "Có vẻ như bạn chưa đăng video nào",
        historyBlogsHeader: "Bài viết",
        historyBlogSubheader: "Bài viết mà bạn đã đăng",
        historyBlogsEmpty: "Có vẻ như bạn chưa đăng bài viết nào",
    }
})

export let draftDisplayStrings = new LocalizedStrings({
    en: {
        draftTabsRecipes: "Recipe drafts",
        draftTabsVideos: "Video drafts",
        draftTabBlogs: "Blog drafts",
        draftRecipesHeader: "Recipes",
        draftRecipesSubheader: "Your saved drafts & private recipes.",
        draftRecipesEmpty: "It seems you haven't saved any drafts yet.",
        draftVideosHeader: "Videos",
        draftVideosSubheader: "Your saved drafts & private videos.",
        draftVideosEmpty: "It seems you haven't saved any drafts yet.",
        draftBlogsHeader: "Blogs",
        draftBlogsSubheader: "Your saved drafts & private blogs.",
        draftBlogsEmpty: "It seems you haven't saved any drafts yet.",
    },
    vi: {
        draftTabsRecipes: "Công thức nháp",
        draftTabsVideos: "Video nháp",
        draftTabBlogs: "Bài viết nháp",
        draftRecipesHeader: "Công thức",
        draftRecipesSubheader: "Nháp và công thức ẩn của bạn.",
        draftRecipesEmpty: "Bạn chưa có bản nháp công thức nào.",
        draftVideosHeader: "Video",
        draftVideosSubheader: "Nháp và video ẩn của bạn.",
        draftVideosEmpty: "Bạn chưa có video tạm nào.",
        draftBlogsHeader: "Bài viết",
        draftBlogsSubheader: "Nháp và bài viết ẩn của bạn.",
        draftBlogsEmpty: "Bạn chưa có bài viết nháp nào.",
    }
})

export let menuDisplayStrings = new LocalizedStrings({
    en: {
        menuHeader: "Menu suggestion",
        menuHeaderNewMenu: "Your new menu",
        menuHeaderSavedMenu: "Showing your saved menu.",
        menuSubheaderProfileIncomplete: "Share with us some details about you, so that we may recommend recipes that suit you best.",
        menuSubheaderEmptyMenu: "Click \"Generate a new menu\" to get started.",
        menuSubheaderNewMenu: "If you like a menu we suggest, save it for later use.",
        menuSubheaderSavedMenuFrom: "Your menu from",
        menuSubheaderSavedMenuTo: "to",
        menuSubheaderExpiredMenu: "This menu has expired, please click \"Generate a new menu\" to get another.",
        menuToday: "Today",
        menuTomorrow: "Tomorrow",
        menuMessageProfileIncomplete: "It seems your health and routine profile are incomplete.",
        menuMessageEmptyMenu: "It seems you don't have a saved menu yet.",
        menuMessageNoRecipes: "Apologies, it seems we couldn't find enough recipes suitable for you... Please check again later.",
        menuUrlCompleteProfile: "Complete your health profile to receive tailored meal plans",
        menuSaved: "Menu saved.",
        about: "About",
        menuGenerate: "Generate a new menu",
        menuLoad: "Load your saved menu",
        menuSave: "Save this menu",
        menuCurrentlyShowing: "Showing your saved menu",
        menuAlreadySaved: "Already saved",
    },
    vi: {
        menuHeader: "Đề xuất thực đơn",
        menuHeaderNewMenu: "Thực đơn mới của bạn",
        menuHeaderSavedMenu: "Đang hiện thực đơn bạn đã lưu",
        menuSubheaderProfileIncomplete: "Hãy chia sẻ chúng tôi một chút về bạn để có thể đề xuất thực đơn phù hợp với bạn",
        menuSubheaderEmptyMenu: "Nhấn nút \"Tạo menu mới\" để bắt đầu.",
        menuSubheaderNewMenu: "Nếu bạn thích thực đơn chúng tôi vừa đề xuất, lưu lại để sử dụng sau này.",
        menuSubheaderSavedMenuFrom: "Thực đơn của bạn từ",
        menuSubheaderSavedMenuTo: "đến",
        menuSubheaderExpiredMenu: "Thực đơn này đã quá hạn, xin hãy nhấn nút \"Tạo menu mới\" để lấy thực đơn mới",
        menuUrlCompleteProfile: "Hãy hoàn thành hồ sơ sức khỏe ngay để nhận được lịch trình ăn",
        menuToday: "Hôm nay",
        menuTomorrow: "Ngày mai",
        menuMessageProfileIncomplete: "Có vẻ như hồ sơ sức khỏe của bạn chưa hoàn thành",
        menuMessageEmptyMenu: "Có vẻ như bạn chưa có lưu thực đơn nào.",
        menuMessageNoRecipes: "Xin lỗi, có vẻ như chúng tôi không đủ công thức phù hợp với bạn... Vui lòng thử lại sau.",
        menuSaved: "Đã lưu thực đơn.",
        about: "Khoảng",
        menuGenerate: "Tạo menu mới",
        menuLoad: "Lấy thực đơn đã lưu",
        menuSave: "Lưu thực đơn",
        menuCurrentlyShowing: "Đang hiện thực đơn đã lưu",
        menuAlreadySaved: "Đã lưu",
    }
})