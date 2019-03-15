import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MychildsPage } from './mychilds.page';

const routes: Routes = [
  {
    path: '',
    component: MychildsPage
  },
  { path: 'cdoctor/:id', loadChildren: './cdoctor/cdoctor.module#CdoctorPageModule' },
  { path: 'vaccines/:id', loadChildren: './vaccines/vaccines.module#VaccinesPageModule' },
  { path: 'followup/:id', loadChildren: './followup/followup.module#FollowupPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MychildsPage]
})
export class MychildsPageModule { }
