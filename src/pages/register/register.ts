import { ProfilePage } from './../profile/profile';
import { User } from './../../app/models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController, private toast: ToastController, public navParams: NavParams, private authFire: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User){
    try {
      const result = await this.authFire.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password);
      user.email = '';
      user.password = '';
      console.log(result);
      this.navCtrl.push(ProfilePage);
      // this.navCtrl.setRoot(ProfilePage);
    } catch (e){
      user.email = '';
      user.password = '';
      this.toast.create({
        message: e.message,
        duration: 3000,
        position: 'bottom'
      }).present();
      console.error(e.message);
      
    }
  }
}
