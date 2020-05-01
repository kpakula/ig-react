
class Auth {

    login(callback) {
        localStorage.setItem("isAuth", true);
        callback();
    }


    logout(callback) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuth");
        callback();
    }


    isAuthenticated() {
        return localStorage.getItem("isAuth");
    }
}
const instance = new Auth();

export default instance;
