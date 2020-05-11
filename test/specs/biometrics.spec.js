import HomeScreen from '../screen/HomeScreen';
import LogoutScreen from '../screen/LogoutScreen';
import BiometricsComponent from '../components/biometrics.component';

const homeScreen = new HomeScreen();
const logoutScreen = new LogoutScreen();
const biometricsComponent = new BiometricsComponent();

const DEFAULT_TIMEOUT = 25000;
const TOUCH_SENSOR_PAGE_TITLE = 'Touch the sensor';

describe('User,', () => {
    beforeEach(() => {
        homeScreen.getHomeScreen().waitForDisplayed(DEFAULT_TIMEOUT);
    });

    it('should be able to add a fingerprint and login successfully', () => {
        // Go to Android Security Settings
        biometricsComponent.goToAndroidSecuritySettingsEnablePin();

        biometricsComponent.getAndroidSecuritySettingsFingerprint().waitForDisplayed(7000);
        biometricsComponent.getAndroidSecuritySettingsFingerprint().click();

        biometricsComponent.getAndroidFingerprintWizardNextBtn().waitForDisplayed(DEFAULT_TIMEOUT);
        biometricsComponent.getAndroidFingerprintWizardNextBtn().click();

        biometricsComponent.providePinLockScreenAndroid();
        biometricsComponent.doneKeyboardAndroid();

        biometricsComponent.getAndroidFingerprintWizardPageTitle().waitForDisplayed(DEFAULT_TIMEOUT);
        expect(biometricsComponent
            .getAndroidFingerprintWizardPageTitle()
            .getText())
            .toEqual(TOUCH_SENSOR_PAGE_TITLE);

        biometricsComponent.addAndroidFingerprint(3, 1);

        biometricsComponent.getAndroidFingerprintWizardLastPageNextBtn().waitForDisplayed(DEFAULT_TIMEOUT);
        biometricsComponent.getAndroidFingerprintWizardLastPageNextBtn().click();

        // Bring back the Application
        browser.startActivity('com.reactnativesampleapp', 'com.reactnativesampleapp.MainActivity');

        /**
         * IMPORTANT!!
         *  Because the app is not closed and opened between the tests
         *  (and thus is NOT starting with the keyboard hidden)
         *  the keyboard is closed here if it is still visible.
         */
        if (browser.isKeyboardShown()) {
            browser.hideKeyboard();
        }
        homeScreen.getGoTologinScreenBtn().click();
        biometricsComponent.getAndroidBiometryAlert().waitForDisplayed(DEFAULT_TIMEOUT);
        biometricsComponent.submitAndroidBiometricLogin(1);

        logoutScreen.getLogoutScreen().waitForDisplayed(DEFAULT_TIMEOUT);
        logoutScreen.getLogoutScreenBtn().click();

        homeScreen.getHomeScreen().waitForDisplayed(DEFAULT_TIMEOUT);
    });

});
