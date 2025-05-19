import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-allstudents',
  imports: [
    CommonModule,
    NgFor,
    FormsModule
    
    
  ],
  templateUrl: './allstudents.component.html',
  styleUrls: ['./allstudents.component.scss']
})
export class AllstudentsComponent implements OnInit {

  dataArray:any=[]
 
  dataStudent={
    firstname:'',
    lastname:'',
    email:'',
    age:0,
    phone:0,
    id:'',
  }

  messageSuccess=''
  constructor(private ds:DataService,private route:Router) {
   
    this.ds.getAllstudents().subscribe((data: any)=>{
  
      this.dataArray=data.students 
    
    })
    
   }

  ngOnInit(): void {
  }


  delete(id:any,i:number){

    this.ds.deletestudent(id).subscribe((response: any)=>{
      console.log(response)
       this.dataArray.splice(i,1)

    })

  }



  getdata(firstname:string,lastname:string,age:number,phone:number,email:string,id:any){
    this.messageSuccess=''
    this.dataStudent.firstname=firstname
    this.dataStudent.lastname=lastname
    this.dataStudent.age=age
    this.dataStudent.phone=phone
    this.dataStudent.email=email
    this.dataStudent.id=id
    console.log(this.dataStudent)

  }


  updatenewstudent(f:any){
    let data=f.value
    this.ds.updateStudent(this.dataStudent.id,data).subscribe((response: any)=>
      {
      console.log(response)
        let indexId=this.dataArray.findIndex((obj:any)=>obj._id==this.dataStudent.id)

        this.dataArray[indexId].firstname=data.firstname
        this.dataArray[indexId].lastname=data.lastname
        this.dataArray[indexId].age=data.age
        this.dataArray[indexId].phone=data.phone
        this.dataArray[indexId].email=data.email


        this.messageSuccess=`this student ${this.dataArray[indexId].firstname} is updated`


      },(err:HttpErrorResponse)=>{
        console.log(err.message)
      
      })
  }


  details(id:any){
    this.route.navigate(['/admin/studentdetails/'+id])
  }



  

}
