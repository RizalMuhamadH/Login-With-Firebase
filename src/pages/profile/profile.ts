import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from './../../app/models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authFire: AngularFireAuth, private afDatabase: AngularFireDatabase) {
  }

  createProfile(profile: Profile){
    this.authFire.authState.take(1).subscribe(auth =>{
      this.afDatabase.object('profile/'+auth.uid).set(this.profile)
      .then(() => this.navCtrl.push(LoginPage));
    });
  }

}
