import LocalizedStrings from "react-localization";

export let requestErrorStrings = new LocalizedStrings({
    en: {
        requestErrorUnauthorized: "You are not authorized to complete this request.",
        requestErrorStatus: "An error has occurred. Status code: ",
        requestErrorException: "There was an unexpected error. "
    },
    vi: {
        requestErrorUnauthorized: "Bạn không được cấp quyền để thực hiện việc đó.",
        requestErrorStatus: "Đã có lỗi xảy ra. Mã lỗi: ",
        requestErrorException: "Đã có lỗi bất ngờ. "
    }
});

export let articleStatusStrings = new LocalizedStrings({
    en: {
        statusPending: "Waiting for review.",
        statusApproved: "Approved and published.",
        statusRejected: "Rejected by administrator.",
        statusDraft: "- - - DRAFT - - -",
    },
    vi: {
        statusPending: "Đang chờ duyệt.",
        statusApproved: "Đã duyệt và đang công khai.",
        statusRejected: "Bị từ chối bởi quản trị viên.",
        statusDraft: "- - - BẢN NHÁP - - -",
    }
});

export let articleToolbarStrings = new LocalizedStrings({
    en: {
        buttonTranslate: "Translate to ",
        buttonSubmit: "Submitted for review",
        buttonPublic: "Public",
        buttonPrivate: "Private",
        submitForReviewConfirm: "Submit your post for review?\nIt will be visible to others once approved by an admin.",
        submitForReviewAlert: "Your post will now be visible to others when approved by an admin.",
        setPublicConfirm: "Set your post to public?\nIt will be visible to everyone else.",
        setPublicAlert: "Your post is now public and visible to others.",
        setPrivateConfirm: "Set your post to private?\nIt will be saved as draft and no longer be visible to others.",
        setPrivateAlert: "Your post is now private.",
        deleteConfirm: "Are you sure you wish to delete this post? This is irreversible.",
        deleteAlert: "Your post has been deleted.",
    },
    vi: {
        buttonTranslate: "Dịch thành ",
        buttonSubmit: "Đã gửi lên xét duyệt",
        buttonPublic: "Công khai",
        buttonPrivate: "Riêng tư",
        submitForReviewConfirm: "Gửi bài đăng của bạn lên xét duyệt?\nBài đăng sẽ được hiển thị với mọi người sau khi được duyệt bởi quản trị viên.",
        submitForReviewAlert: "Bài đăng sẽ được hiển thị cho mọi người sau khi được duyệt bởi quản trị viên.",
        setPublicConfirm: "Chuyển bài đăng qua công khai?\nBài đăng sẽ được hiển thị với mọi người.",
        setPublicAlert: "Bài đăng đã được công khai và hiển thị với mọi người.",
        setPrivateConfirm: "Chuyển bài đăng về riêng tư?\nBài đăng sẽ được lưu dưới dạng bản nháp và chỉ hiển thị với bạn.",
        setPrivateAlert: "Bài đăng đã chuyển về trạng thái riêng tư.",
        deleteConfirm: "Bạn chắc chắn muốn xóa bài đăng này? Đây là một đi không trở về đấy.",
        deleteAlert: "Bài đăng đã bị xóa.",
    }
});