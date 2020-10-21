import { Component, OnInit} from '@angular/core';
import {  FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../_services';

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  
  packages = [500, 1000, 2000 ];

  fitnessForm: FormGroup;
  
  constructor(
    private userservice: UserService,
  ) { }
  

  ngOnInit() {

    this.fitnessForm = new FormGroup(
      {
        firstname: new FormControl(this.userservice.appointmentData.firstname, [Validators.required, Validators.pattern("[A-Za-z]+")]),
        lastname: new FormControl(this.userservice.appointmentData.lastname, [Validators.required, Validators.pattern("[A-Za-z]+")]),
        age: new FormControl(this.userservice.appointmentData.age, [Validators.required, this.ageValidate]),
        email: new FormControl(this.userservice.appointmentData.email, [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
        streetaddress: new FormControl(this.userservice.appointmentData.streetaddress, [Validators.required]),
        pincode: new FormControl(this.userservice.appointmentData.pincode, [Validators.required,this.pinValidate]),
        packages: new FormControl(this.userservice.appointmentData.packages, [Validators.required]),
        trainerpreference: new FormControl(this.userservice.appointmentData.trainerpreference),
        physiotherapist: new FormControl(this.userservice.appointmentData.physiotherapist),
        inr: new FormControl(this.userservice.appointmentData.inr, [Validators.required]),
        paisa: new FormControl(this.userservice.appointmentData.paisa, [Validators.required]),
        city: new FormControl(this.userservice.appointmentData.city, [Validators.required]),
        state: new FormControl(this.userservice.appointmentData.state, [Validators.required]),
        country:new FormControl(this.userservice.appointmentData.country, [Validators.required]),
        phonenumber:new FormControl(this.userservice.appointmentData.phonenumber, [Validators.required])
      }
      
    )
    
  }

  ageValidate(formcontrol) {
    if (formcontrol.value <= 18 || formcontrol.value >= 60) {  
      console.log("In Agevalid")
      return { "age": true };
    }
  }
  pinValidate(formcontrol) {
    if (formcontrol.value != null)
      if (formcontrol.value.length < 6 || formcontrol.value.length > 6) {
        return { "pincode": true }
      }

  }

  onSubmit(appointmentData){
    
    if(appointmentData.id!=null){
      alert("Data updated successfully");
      this.updatefitnessdata(appointmentData)
    }
    else{
      alert("Appointment added  successfully");
      this.postfitnessdata(appointmentData)
    }
  }

  postfitnessdata(obj) {
    this.userservice.postfitnessdata(obj).subscribe();
  }
   
  updatefitnessdata(obj) {
    this.userservice.updatefitnessdata(obj).subscribe();
  }
}
