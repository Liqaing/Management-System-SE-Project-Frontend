

export const storeUserProfileData = (res) => {
    localStorage.setItem("isLogin", "1");
    localStorage.setItem("username",res.username);
    localStorage.setItem("role",res.role);
}