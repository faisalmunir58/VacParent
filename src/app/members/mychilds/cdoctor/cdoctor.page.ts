import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-cdoctor',
  templateUrl: './cdoctor.page.html',
  styleUrls: ['./cdoctor.page.scss'],
})
export class CdoctorPage implements OnInit {

  childID: any;
  doctors: any;
  constructor(
    private loadingController: LoadingController,
    private alertService: AlertService,
    private doctorService: DoctorService,
    private toastService: ToastService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get(environment.USER_ID).then((val) => {
      this.childID = val;
    });
    this.getDoctors();
  }

  async getDoctors() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.doctorService.getDoctor(this.childID)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.doctors = res.ResponseData;
          loading.dismiss();
        }
        else {
          loading.dismiss();
          this.toastService.create(res.Message);
        }
      }, (err) => {
        loading.dismiss();
        this.toastService.create(err)
      });
  }

  alertChangeDoctor(id) {
    this.alertService.confirmAlert('Are you sure you want to change ?', null)
      .then((yes) => {
        if (yes) {
          this.changeClinic(id);
        }
      });

  }

  async changeClinic(clinicID) {
    let data = { ID: this.childID, ClinicID: clinicID }
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.doctorService.changeDoctor(data)
      .subscribe(res => {
        if (res.IsSuccess) {
          loading.dismiss();
          this.getDoctors();
          this.toastService.create("Successfully Change")
        }
        else {
          loading.dismiss();
          this.toastService.create(res.Message);
        }
      }, (err) => {
        loading.dismiss();
        this.toastService.create(err)
      });
  }
}
