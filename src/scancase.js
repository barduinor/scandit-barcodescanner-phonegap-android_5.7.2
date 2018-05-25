
var ScanSettings = cordova.require("com.mirasense.scanditsdk.plugin.ScanSettings");
var ScanSession = cordova.require("com.mirasense.scanditsdk.plugin.ScanSession");
var Barcode = cordova.require("com.mirasense.scanditsdk.plugin.Barcode");

function ScanCase(scanSettings, callbacks) {
    this.callbacks = callbacks;
};

ScanCase.prototype = {
    _handleEvent: function (eventName, args) {
        if (this.callbacks[eventName]) {
            var desiredState = "active";
            try {
                desiredState = this.callbacks[eventName](args) || "active";
            } catch (e) {
                console.log('event ' + eventName + ' failed:' + e);
            }
            if (eventName === 'didScan') {
                cordova.exec(null, null, "SBSScanCasePlugin", "finishDidScanCallback", [desiredState]);
            }
        }
    },
    setState: function (state) {
        cordova.exec(null, null, "SBSScanCasePlugin", "setState", [state]);
    }
};

ScanCase.acquire = function (scanSettings, callbacks) {
    var sc = new ScanCase(scanSettings, callbacks);
    cordova.exec(
        function(args) { sc._handleEvent(args[0], args[1]); },
        null,
        "SBSScanCasePlugin",
        "acquire",
        [scanSettings]
    );
    return sc;
};

ScanCase.prototype.volumeButtonToScanEnabled = function (enabled) {
    cordova.exec(null, null, "SBSScanCasePlugin", "volumeButtonToScanEnabled", [enabled]);
};

ScanCase.prototype.scanBeepEnabled = function (enabled) {
    cordova.exec(null, null, "SBSScanCasePlugin", "scanBeepEnabled", [enabled]);
};

ScanCase.prototype.errorSoundEnabled = function (enabled) {
    cordova.exec(null, null, "SBSScanCasePlugin", "errorSoundEnabled", [enabled]);
};

ScanCase.prototype.setTimeout = function (timeout, fromState, toState) {
    cordova.exec(null, null, "SBSScanCasePlugin", "setTimeout", [timeout, fromState, toState]);
};

ScanCase.State = {
    ACTIVE: 'active',
    OFF: 'off',
    STANDBY: 'standby'
};

ScanCase.StateChangeReason = {
    MANUAL: 'manual',
    TIMEOUT: 'timeout',
    VOLUME_BUTTON: 'volumeButton'
};

module.exports = ScanCase
