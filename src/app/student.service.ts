import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  gpt_token:any;

  constructor(private http:HttpClient  ) {
  
    this.gpt_token=environment.gpt_token;
   }
  
  gpt( input):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.gpt_token}` 
    });
    const body=
    {
      "model": "text-davinci-003",
      "prompt": input,
      "temperature": 0.7,
      "max_tokens": 256,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0.6,
      "stop": [" Human:", " AI:"]
    }
    

    return this.http.post<any>('https://api.openai.com/v1/completions',body,{ headers }
    
    )
  }
 
  
}
