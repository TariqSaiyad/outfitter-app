import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterEvent } from '@angular/router';
import { ToastController, PopoverController } from '@ionic/angular';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

/**
 * This is the home page that enables the tabs to work. It also contains
 * the FAB button for adding items/outfits.
 */
export class HomePage {

  constructor(public popoverController: PopoverController,
    public toastController: ToastController,
    private router: Router,
    public afAuth: AngularFireAuth) { }

  /**
   * This toast will be shown when the user logs in.
   */
  async loginToast() {
    const toast = await this.toastController.create({
      header: 'You have successfully logged in, ' + this.afAuth.auth.currentUser.displayName,
      position: 'top',
      color: 'dark',
      duration: 2000,
    });
    toast.present();
  }

  /**
   * This is the callback for a successful login. 
   * @param signInSuccessData this is the firebase user login authentication details
   */
  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    //go to items page by default
    this.router.navigateByUrl('/home/items');
    //show login toast.
    this.loginToast();
  }

  /**
   * This handles the sign out for the app. It uses the firebase signout
   * function to handle authentication.
   */
  signOut() {
    this.afAuth.auth
    this.afAuth.auth.signOut().then(() => {
      // this.router.navigateByUrl('/home'); 
      location.reload();
    });
  }

}
