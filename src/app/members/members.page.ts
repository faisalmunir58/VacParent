import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
})
export class MembersPage implements OnInit {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/members/dashboard',
      icon: 'home'
    },
  ];

  constructor(private storage: Storage) { }

  ngOnInit() {
  }

  clearStorage() {
    this.storage.clear();
  }
}
