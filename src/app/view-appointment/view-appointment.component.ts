import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { DataModel } from '../_services/DataModel/dataModel';
import { Router } from "@angular/router";


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  appointmentList: DataModel[];
  constructor(
    private userservice: UserService,
    private router: Router
  ) {}

  placeAppointment() {
    this.router.navigateByUrl("place-fitness-trainer-appointment");
  }

  ngOnInit() {
    this.getfitness();
  }
  
  getfitness() {
    this.userservice.getfitnessdata().subscribe(
      (data) => {
        this.appointmentList = data;
      }
    )
    
  }

  deleteAppointment(id: number){
    console.log(id);
    this.userservice.deleteAppointment(id).subscribe(
      (data) => {
        this.getfitness();
      })
  }

  edit(obj){
    console.log(obj);
    this.userservice.appointmentData=Object.assign({}, obj);
  }
}
