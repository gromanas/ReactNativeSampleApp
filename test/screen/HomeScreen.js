/* eslint-disable class-methods-use-this */

class HomeScreen {
    getHomeScreen() {
        return $('~test-home-screen');
    }

    getGoTologinScreenBtn() {
        return $('~test-go-to-login-screen-btn');
    }

}
module.exports = HomeScreen;
