import { Profile } from './../../app/models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, ActionSheetController, AlertController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { BrowserTab } from '@ionic-native/browser-tab';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  appName: string = 'Login With Firebase';

  profileData: FirebaseObjectObservable<Profile>;

  constructor(public navCtrl: NavController, 
    public toast: ToastController, 
    public navParams: NavParams, 
    private authFire: AngularFireAuth, 
    private afDatabase: AngularFireDatabase, 
    public appVersion: AppVersion, 
    public browser: BrowserTab, 
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController, 
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.authFire.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        //test on device
        // this.appVersion.getAppName().then((appname) =>{
        //   this.appName = appname;
        // });
        this.toast.create({
          message: 'Welcome to ' +this.appName+', '+data.email,
          duration: 3000,
          position: 'bottom'
        }).present();

        this.profileData = this.afDatabase.object('profile/'+data.uid).valueChanges();
        console.log(this.appVersion.getAppName());
        

      } else {
        this.toast.create({
          message: 'Could not find authentication detail',
          duration: 3000,
          position: 'bottom'
        }).present();
      }

      console.log(data)
    });
  }

  findMe(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Find Me?',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Email',
          icon: !this.platform.is('ios') ? 'ios-mail' : null,
          handler: () => {
            this.alertCtrl.create({
              title: 'Email',
              subTitle: 'rizalmuhamadh@gmail.com',
              buttons: ['OK']
            }).present();
            console.log('Emial clicked');
          }
        },
        {
          text: 'Github',
          icon: !this.platform.is('ios') ? 'logo-github' : null,
          handler: () => {
            if (this.platform.is('cordova')){
              console.error('cordova');
              
            } else{
              this.browser.isAvailable()
                .then(isAvailable => {
                  if (isAvailable) {
                    this.browser.openUrl('https://github.com/RizalMuhamadH');
                  } else {
                    // open URL with InAppBrowser instead or SafariViewController
                  }
                });
            }
            
            console.log('Github clicked');
          }
        },
        {
          text: 'Facebook',
          icon: !this.platform.is('ios') ? 'logo-facebook' : null,
          handler: () => {
            if (this.platform.is('cordova')) {
              console.error('cordova');

            } else {
              this.browser.isAvailable()
                .then(isAvailable => {
                  if (isAvailable) {
                    this.browser.openUrl('https://www.facebook.com/Kubichura');
                  } else {
                    // open URL with InAppBrowser instead or SafariViewController
                  }
                });
            }
            console.log('Facebook clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
