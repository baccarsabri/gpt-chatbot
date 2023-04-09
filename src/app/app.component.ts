import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StudentService } from './student.service';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {  
  name = 'Jquery Integration With Angular!';  
  input:any;
  day="";
  time=""
  isJqueryWorking: any;  
  text="The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\n"
  constructor(private service:StudentService){}
  ngOnInit()  
  { 
   
    const date=new Date();
    this.day=date.toLocaleString('en-US', { weekday: 'long' })
    this.time =`${date.getHours()}:${date.getMinutes()}`
  
  $(document).ready(function () {
    //Toggle fullscreen
    $(".chat-bot-icon").click(function (e) {
        $(this).children('img').toggleClass('hide');
        $(this).children('svg').toggleClass('animate');
        $('.chat-screen').toggleClass('show-chat');
    });
    $('.chat-mail button').click(function () {
        $('.chat-mail').addClass('hide');
        $('.chat-body').removeClass('hide');
        $('.chat-input').removeClass('hide');
        $('.chat-header-option').removeClass('hide');
    });
    $('.end-chat').click(function () {
        $('.chat-body').addClass('hide');
        $('.chat-input').addClass('hide');
        $('.chat-session-end').removeClass('hide');
        $('.chat-header-option').addClass('hide');
    });
});


  }


  slowLastYou(){
    $(document).ready(function() {
      var index = 0;
      var $lastChatBubbleYou = $(".chat-bubble.you").last();
      console.log
      var text = $lastChatBubbleYou.text();
      $lastChatBubbleYou.empty();
      var timer = setInterval(function() {
        if (index < text.length) {
          $lastChatBubbleYou.append(text.charAt(index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100);
    });
  }
  onEnter(){
    this.submit();
  }
  submit(){
   const prompt= this.input;
   this.input="";
   this.text+='\n\nHuman:'+prompt
   const chatBody = document.getElementById('chat_body');

   // Create a new div element with class chat-bubble and me
   const newBubbleMe = document.createElement('div');
   newBubbleMe.classList.add('chat-bubble', 'me');
   
   // Add some text to the new bubble
   newBubbleMe.textContent = prompt;
   
   // Append the new bubble to the chat_body div
   chatBody.appendChild(newBubbleMe);


   // Create a new div element with class chat-bubble and me
   const newBubbleYou = document.createElement('div');
   newBubbleYou.classList.add('chat-bubble', 'you' ,'waiting');
   
   // Add some text to the new bubble
   newBubbleYou.innerHTML = `
   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;display: block;shape-rendering: auto;width: 43px;height: 20px;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
       <circle cx="0" cy="44.1678" r="15" fill="#ffffff">
           <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>
       </circle> <circle cx="45" cy="43.0965" r="15" fill="#ffffff">
       <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.39999999999999997s"></animate>
   </circle> <circle cx="90" cy="52.0442" r="15" fill="#ffffff">
       <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.19999999999999998s"></animate>
   </circle></svg>
`;
   
   // Append the new bubble to the chat_body div
   chatBody.appendChild(newBubbleYou);
 // this.slowLastYou();

    this.service.gpt(this.text).subscribe(
      res=>{
        console.log(res.choices[0].text)
        let gpt_Output=res.choices[0].text;
        gpt_Output=gpt_Output.replace(/AI Assistant:/gi,"");
        gpt_Output=gpt_Output.replace(/AI Assistant/gi,"");
        gpt_Output=gpt_Output.replace(/AI:/gi,"");
        gpt_Output=gpt_Output.replace(/AI/gi,"");
        gpt_Output=gpt_Output.replace(/!アシスタント:/gi,"");
        gpt_Output=gpt_Output.replace(/、アシスタント！/gi,"");
        gpt_Output=gpt_Output.replace(/。/gi,"");
        
         
        
       // gpt_Output=gpt_Output.replace(/\,/gi,"");
        if (gpt_Output.substring(0, 6).includes("!")) {
          gpt_Output = gpt_Output.replace(/\!/, "");
        }
        
        if (gpt_Output.substring(0, 7).includes("?")) {
          gpt_Output = gpt_Output.replace(/\?/, "");
        }
        
     

        newBubbleYou.textContent=gpt_Output;
        this.text+='\n\nAi:'+res.choices[0].text
        console.log(this.text)
        this.slowLastYou();
       
       
       
      }
    )
    
  }
}