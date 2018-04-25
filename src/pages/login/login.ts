import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';

import { User } from './../../app/models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public toast: ToastController, private authFire: AngularFireAuth) {
  }

  async signIn(user: User){
    try{
      const result = await this.authFire.auth.signInWithEmailAndPassword(user.email, user.password);
      
      console.log(result);

      if (!result.emailVerified){
        this.alertCtrl.create({
          title: 'Verification Email',
          message: 'Email anda belum terverifikasi, verifikasi segera!<br>Kami akan mengirimkan email verifikasi ke email anda.',
          buttons: [
            {
              text: 'Batal',
              handler: () => {
                console.log('batal');
                
              }
            },
          {
            text: 'Verifikasi',
            handler: () => {
              let person = firebase.auth().currentUser;
              person.sendEmailVerification();
              console.log('verifikasi');
              
            }
          }]
        }).present();
      } else {
        this.navCtrl.setRoot(HomePage);
      }
      
    } catch(e){
      this.toast.create({
        message: e.message,
        duration: 3000,
        position: 'bottom'
      }).present();
      console.error(e.message);
      
    }
    
  }
  signUp(){
    this.navCtrl.push(RegisterPage);
  }

}
