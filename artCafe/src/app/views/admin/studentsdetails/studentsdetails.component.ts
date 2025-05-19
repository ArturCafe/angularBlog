import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentsdetails',
  imports: [CommonModule,

  ],
  templateUrl: './studentsdetails.component.html',
  styleUrl: './studentsdetails.component.scss'
})
export class StudentsdetailsComponent implements OnInit {

  id=''
  dataObject:any
  messageErr=''
  constructor(private route:ActivatedRoute,private ds:DataService) {
    this.route.params.subscribe(params=>this.id=params['id'])

    this.ds.getOnestudent(this.id).subscribe(response=>this.dataObject=response,(err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this student in our database"})
   }

  ngOnInit(): void {
  }

}