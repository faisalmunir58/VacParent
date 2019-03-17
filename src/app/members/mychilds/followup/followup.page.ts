import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';
import { VaccineService } from 'src/app/services/vaccine.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.page.html',
  styleUrls: ['./followup.page.scss'],
})
export class FollowupPage implements OnInit {

  childData: any;
  childID: any;
  constructor(
    private loadingController: LoadingController,
    private storage: Storage,
    private vaccineService: VaccineService,
    private toastService: ToastService,

  ) { }

  ngOnInit() {
    this.storage.get(environment.USER_ID).then((val) => {
      this.childID = val;
    });
    this.getfollowupchild();
  }

  async getfollowupchild() {
    let data = { 'ChildID': this.childID }
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.vaccineService.getFollowupByChild(data)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.childData = res.ResponseData;
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
}
