import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() onCloseSidenav : EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout : EventEmitter<boolean> = new EventEmitter();
  @Input() loggedInUser?: firebase.default.User | null;

  constructor() { }

  ngOnInit(): void {
  }

  close(logout?: boolean){
    if(logout === true){
      this.onLogout.emit(logout);
    }
    this.onCloseSidenav.emit(true);
  }
}
