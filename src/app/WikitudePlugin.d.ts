/**
 * Wrapper for the Wikitude SDK Phonegap Plugin - to use with IONIC2
 * (c) 2016 Schneeweis.Technology 
 */
interface WikitudePlugin {

  isDeviceSupported(
    successCallback: (success: string) => void,
    errorCallback: (message: string) => void,
    requiredFeatures: [string]): void;

  loadARchitectWorld(
    successCallback: (success: string) => void,
    errorCallback: (message: string) => void,
    architectWorldPath: string,
    requiredFeatures: [string],
    startupConfiguration: JSON): void;

  close(): void;

  hide(): void;

  show(): void;

  // test type ok?
  callJavaScript(js: any): void;

  setOnUrlInvokeCallback(
    onUrlInvokeCallback: (success: string) => void): void;

  setLocation(
    latitude: any,
    longitude: any,
    altitude: any,
    accuracy: any): void;

  captureScreen(
    successCallback: (success: string) => void,
    errorCallback: (message: string) => void,
    includeWebView: boolean,
    imagePathInBundleOrNullForPhotoLibrary: string): void;

  setErrorHandler(
    errorHandler: (message: string) => void): void;

  setDeviceSensorsNeedCalibrationHandler(
    startCalibrationHandler: (message: string) => void): void;

  setDeviceSensorsFinishedCalibrationHandler(
    finishedCalibrationHandler: (message: string) => void): void;

  setBackButtonCallback(
    onBackButtonCallback: (message: string) => void): void;

  /* Lifecycle updates */

  onResume(): void;
  onBackButton(): void;
  onPause(): void;

  onWikitudeOK(): void;
  onWikitudeError(): void;

  _sdkKey:string;
  FeatureGeo:string;
  Feature2DTracking:string;
  CameraPositionUndefined:number;
  CameraPositionFront:number;
  CameraPositionBack:number;
  CameraFocusRangeNone:number;
  CameraFocusRangeNear:number;
  CameraFocusRangeFar:number;
    
}

declare var WikitudePlugin: WikitudePlugin;