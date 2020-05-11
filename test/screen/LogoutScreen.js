/* eslint-disable class-methods-use-this */

class LogoutScreen {
    getLogoutScreen() {
        return $('~test-logout-screen');
    }

    getLogoutScreenBtn() {
        return $('~test-logout-btn');
    }

}
module.exports = LogoutScreen;
