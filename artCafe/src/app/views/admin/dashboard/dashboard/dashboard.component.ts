import { Component, OnInit } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ DashboardRoutingModule, ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}