import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast.service';
import { VaccineService } from 'src/app/services/vaccine.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.page.html',
  styleUrls: ['./vaccines.page.scss'],
})
export class VaccinesPage implements OnInit {

  vaccine: any[] = [];
  dataGrouping: any[] = [];
  childID: any;
  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private vaccineService: VaccineService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.childID = this.route.snapshot.paramMap.get('id');
    this.getVaccination();
  }

  async getVaccination() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    await this.vaccineService.getVaccinationById(this.childID).subscribe(
      res => {
        if (res.IsSuccess) {
          this.vaccine = res.ResponseData;
          this.dataGrouping = this.groupBy(this.vaccine, 'Date');
          loading.dismiss();
          this.vaccine.forEach(doc => {
            doc.Date = moment(doc.Date, "DD-MM-YYYY").format('YYYY-MM-DD');
          });
        }
        else {
          loading.dismiss()
          this.toastService.create(res.Message, 'danger');
        }
      },
      err => {
        loading.dismiss();
        this.toastService.create(err, 'danger');
      }
    );
  }

  groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  async updateDate($event, vacId) {
    let newDate = $event.detail.value;
    newDate = moment(newDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
    let data = { 'Date': newDate, 'ID': vacId }
    await this.vaccineService.updateVaccinationDate(data).subscribe(
      res => {
        if (res.IsSuccess) {
          this.getVaccination();
          this.toastService.create(res.Message)
        }
        else {
          this.toastService.create(res.Message, 'danger');
        }
      },
      err => {
        this.toastService.create(err, 'danger');
      }
    );
  }
}
