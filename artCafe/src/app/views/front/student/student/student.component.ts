import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from '../student-routing.module';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-student',
  imports: [
    CommonModule,
    StudentRoutingModule,

  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  
  dataStudent:any
  
   ngOnInit(): void {
  }


  constructor(private ds:DataService,private router:Router) {
    this.ds.getAllstudents().subscribe(data=>this.dataStudent=data)
   }

Godetails(id: any) {
  this.router.navigate(['student/'+id])
}

  
 

}
