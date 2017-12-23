/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */      
      WikitudePlugin._sdkKey = "FI3fezoHEdyX5k5ysYtUjz2kQth9BuVwBAy4rryPghCk0E2G2EVfk9VCsqyKPnOJEc7JdsdzupDgpASGoCRGognFZXAH5Eb9o+2dSaAVystG45f1wYEC1BpQqryh13tglFwvPlVB+I2xzBGzBbG2y7pSzeeNsvVP82Jm0RcYOsBTYWx0ZWRfXxkGr6IyYKG9yxrXvzOHd8iTQZbn/+tbvPY079zDUL+86ur3728mlvV3wAFF3zVjBPRzf/bWjc4wZBCNtST0HDOfeGdTr/kO+R1Met9Z5LO1txCSdRQS09+3vKnFEY50pdDgEpeeZB5ujQy21eVUnfc5lNGbsEAx5YUzTWidxy4y835FNxwiSW9QrBPJ/U1aEKexHQ3KH0D1aM03kK8hPTRWG1auTfkSaAjApzx2T51/kW4n98EDQzts8cxmzyvqK91UBFVn+ILWYyl6D57bxLcadN7XL3BNJfsZG74CcVecU/ySljRXiyqAreF//8ckL29gSz25WDI4RSuP2SshM4q9njmdB9wWYpd2XC4a9hImfz55L2j/Gw4T7VrXQg2Zb+wErhsjHcWE5WbQuPTFUiHzlNhd6QLIJtgDmMR9VOoNrB0sWOe5h4M001drXrIPG+/CDiF2HbTV5DDqszy+/FN2fiAW7Iskjf/OJSK167mBU0MYUbTFuOipTNas2MYbX31MmReuvbJ4";
      
            /** Check if your device supports AR */
            WikitudePlugin.isDeviceSupported(
                function(success) {
                  console.log("Your platform supports AR/Wikitude. Have fun developing!!");
                },
                function(fail) {
                  console.log("Your platform failed to run AR/Wikitude: "+fail);
                },
                [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
            );                  
      
            /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
             * through the function below for the direction Ionic app --> Wikitude SDK 
             * For calls from Wikitude SDK --> Ionic app see the captureScreen example in 
             * WikitudeIonic3StarterApp/www/assets/07_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
            // set the function to be called, when a "communication" is indicated from the AR View  

            WikitudePlugin.setJSONObjectReceivedCallback(obj => {
      
                console.log("setJSONObjectReceivedCallback ..."+JSON.stringify(obj));
                // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic)
                if (obj["action"]){
                    switch (obj["action"]) {
                        case "closeWikitudePlugin":
                            // close wikitude plugin
                            WikitudePlugin.close();
                            break;
                        case "captureScreen":

                            WikitudePlugin.captureScreen(
                                (absoluteFilePath) => {
                                    console.log("snapshot stored at:\n" + absoluteFilePath);
                
                                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                                },
                                (errorMessage) => {
                                    console.log(errorMessage);
                                },
                                true, null
                            );
    
                            break;
                        default:
                            console.warn("action not handled => ", obj);
                            break;
                    } // end switch
                } // end if (obj.action)
            });
      
            /**
             * Define the generic ok callback
             */
            WikitudePlugin.onWikitudeOK = function() {
                console.log("Things went ok.");
            }
            
            /**
             * Define the generic failure callback
             */
            WikitudePlugin.onWikitudeError = function() {
                console.log("Something went wrong");
            }
      
            // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
            // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
            //WikitudePlugin.setLocation(47, 13, 450, 1);
      
            /* for Android only
            WikitudePlugin.setBackButtonCallback(
                () => {
                    console.log("Back button has been pressed...");
                }
            );                  
            */
            
    });
  }
}
