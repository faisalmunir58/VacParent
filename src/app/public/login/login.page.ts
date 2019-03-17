import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  fg: FormGroup
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private loginService: LoginService,
    private toastService: ToastService

  ) { }

  ngOnInit() {

    this.skipLoginIfAlreadyLoggedIn();
    this.fg = this.formBuilder.group({
      'MobileNumber': [null, Validators.required],
      'Password': [null, Validators.required],
      'CountryCode': ['92'],
      'UserType': ['PARENT']
    });
  }

  skipLoginIfAlreadyLoggedIn() {
    this.storage.get(environment.IS_LOGGED_IN).then(value => {
      if (value) {
        this.loginService.changeState(value);
        this.router.navigate(['members/dashboard']);
      }
    });
  }

  async login() {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    await this.loginService.checkAuth(this.fg.value)
      .subscribe(res => {
        if (res.IsSuccess) {
          loading.dismiss();
          this.loginService.changeState(true);
          this.storage.set(environment.USER_ID, res.ResponseData.ChildID);
          this.storage.set(environment.Mobile_Number, res.ResponseData.MobileNumber);
          this.storage.set(environment.IS_LOGGED_IN, true);
          this.router.navigate(['/members/']);
        }
        else {
          loading.dismiss();
          this.toastService.create(res.Message, 'danger');
        }
      }, (err) => {
        loading.dismiss();
        this.toastService.create(err, 'danger');
      });
  }

  // show Alert msg for forgot password
  async forgotPasswordAlert() {

    const alert = await this.alertController.create({
      header: 'Forgot Password',
      inputs: [
        {
          name: 'MobileNumber',
          type: 'text',
          placeholder: 'like 3211231231',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Send Email/SMS',
          handler: (data) => {
            this.forgotPassword(data.MobileNumber);
          }
        }
      ]
    });
    await alert.present();
  }

  // Call api to forgot password
  async forgotPassword(MobileNumber) {

    let data = { 'CountryCode': '92', 'UserType': 'PARENT', 'MobileNumber': MobileNumber }
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    await this.loginService.forgotPassword(data)
      .subscribe(res => {
        if (res.IsSuccess) {
          loading.dismiss();
          this.toastService.create('Check Msg on Mobile')
        }
        else {
          this.toastService.create(res.Message, 'danger');
        }
      }, (err) => {
        this.toastService.create(err, 'danger');
      });
  }

}
