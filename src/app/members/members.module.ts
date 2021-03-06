import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MembersPage } from './members.page';
import { MembersRoutingModule } from './members-routing.module';

const routes: Routes = [
  {
    path: '',
    component: MembersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MembersRoutingModule
  ],
  declarations: [MembersPage]
})
export class MembersPageModule {}
