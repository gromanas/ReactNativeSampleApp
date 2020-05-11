/* eslint-disable class-methods-use-this */

class BiometricsComponent {
  getAndroidBiometryAlert() {
    return $('android=new UiSelector().resourceId("com.reactnativesampleapp:id/fingerprint_icon")');
  }

  getAndroidBiometryAlertTitle() {
    return $('android=new UiSelector().resourceId("android:id/title")');
  }

  getAndroidBiometryAlertCancelButton() {
    return $('android=new UiSelector().resourceId("com.reactnativesampleapp:id/cancel_button")');
  }

  getAndroidBiometryAlertError() {
    return $('android=new UiSelector().resourceId("com.agency.lotto:id/fingerprint_error")');
  }

  getAndroidSecuritySettingsFingerprint() {
    return $('android=new UiSelector().text("Fingerprint")');
  }

  getAndroidFingerprintWizardNextBtn() {
    return $(
      'android=new UiSelector().resourceId("com.android.settings:id/fingerprint_next_button")',
    );
  }

  getAndroidFingerprintWizardPageTitle() {
    return $('android=new UiSelector().resourceId("com.android.settings:id/suw_layout_title")');
  }

  getAndroidFingerprintWizardLastPageNextBtn() {
    return $('android=new UiSelector().resourceId("com.android.settings:id/next_button")');
  }

  getAndroidFingerprintDeleteBtn(num) {
    return $(`(//android.widget.ImageView[@content-desc="Delete"])[${num}]`);
  }

  getAndroidFingerprintDeleteAlert() {
    return $('android=new UiSelector().resourceId("android:id/alertTitle")');
  }

  getAndroidFingerprintDeleteAlertDelButton() {
    return $('android=new UiSelector().resourceId("android:id/button1")');
  }

  getAndroidFingerprintAddButton() {
    return $('//android.widget.LinearLayout[1]/android.widget.RelativeLayout/android.widget.TextView');
  }

  getAndroidFingerprintSecondAddButton() {
    return $('//android.widget.LinearLayout[2]/android.widget.RelativeLayout/android.widget.TextView');
  }

  submitAndroidBiometricLogin(fingerprintId) {
    return browser.fingerPrint(fingerprintId);
  }

  goToAndroidSecuritySettingsDisablePin() {
    browser.execute('mobile: shell', {
      command: 'am start -a android.settings.SECURITY_SETTINGS && locksettings clear --old 1234',
    });
  }

  goToAndroidSecuritySettingsEnablePin() {
    browser.execute('mobile: shell', {
      command: 'am start -a android.settings.SECURITY_SETTINGS && locksettings set-pin 1234',
    });
  }

  goToAndroidSecuritySettings() {
    browser.execute('mobile: shell', {
      command: 'am start -a android.settings.SECURITY_SETTINGS',
    });
  }

  addPinLockScreenAndroid() {
    browser.execute('mobile: shell', {
      command: 'locksettings set-pin 1234',
    });
  }

  providePinLockScreenAndroid() {
    browser.execute('mobile: shell', {
      command: 'input text 1234',
    });
  }

  doneKeyboardAndroid() {
    browser.execute('mobile: shell', {
      command: 'input keyevent 66',
    });
  }

  addAndroidFingerprint(times, fingerprintId) {
  for (let i = 1; i <= times; i++) {
    browser.pause(1500);
    browser.fingerPrint(fingerprintId);
  }
 }
}

module.exports = BiometricsComponent;
