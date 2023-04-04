import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})

export class NavbarComponent implements OnInit {
  navbarColor: any;
  userSignedIn: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.navbarColor = data['navbarColor'];
    })
  }
}
