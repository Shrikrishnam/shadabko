import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataModel } from './DataModel/dataModel';
import { contactDataModel } from './DataModel/Contact';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:6565/";

    appointmentData: DataModel = {
      firstname: '',
      lastname: '',
      age: null,
      phonenumber: null,
      email: '',
      streetaddress: '',
      city: '',
      state: '',
      country: '',
      pincode: null,
      trainerpreference: '',
      physiotherapist: '',
      packages: null,
      inr: null,
      paisa: null,
      id: null
    }

    contactData: contactDataModel = {
      firstname: '',
      lastname: '',            
      phonenumber: null,
      email: '',
      message: '',
      id: null,
    }

    constructor(private http: Http) { }
    postfitnessdata(obj): Observable<DataModel> {
      return this.http.post(UserService.BaseUrl+'allfriends',obj,httpOptions).pipe(map((response: Response) => response.json()));
    }
    getfitnessdata(): Observable<DataModel[]> {
      return this.http.get(UserService.BaseUrl+'allfriends',httpOptions).pipe(map((response: Response) => response.json()));
    }

    deleteAppointment(id: number): Observable<DataModel>{
      return this.http.delete(UserService.BaseUrl+ 'allfriends' +'/' + id, httpOptions).pipe(map((response: Response) => response.json()));
    }

    updatefitnessdata(obj): Observable<DataModel>{
      return this.http.put(UserService.BaseUrl+ 'allfriends' +'/' + obj.id, obj, httpOptions).pipe(map((response: Response) => response.json()));
    }

    postcontactdata(obj): Observable<contactDataModel> {
      return this.http.post(UserService.BaseUrl+'contacts',obj,httpOptions).pipe(map((response: Response) => response.json()));
    }
}