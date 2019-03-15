import { Component, OnInit } from '@angular/core';
import { ChildService } from 'src/app/services/child.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-mychilds',
  templateUrl: './mychilds.page.html',
  styleUrls: ['./mychilds.page.scss'],
})
export class MychildsPage implements OnInit {

  childID: any;
  childs: any;
  constructor(
    private loadingController: LoadingController,
    private childSerrvice: ChildService,
    private toastService: ToastService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.storage.get(environment.USER_ID).then((val) => {
      this.childID = val;
    });
    this.getClinics();
  }

  async getClinics() {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    await this.childSerrvice.getChild(this.childID).subscribe(
      res => {
        if (res.IsSuccess) {
          this.childs = res.ResponseData;
          console.log(this.childs);
          loading.dismiss();
        }
        else {
          loading.dismiss();
          this.toastService.create(res.Message, 'danger');
        }
      },
      err => {
        loading.dismiss();
        this.toastService.create(err, 'danger');
      }
    );
  }
}
