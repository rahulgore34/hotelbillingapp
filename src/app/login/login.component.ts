import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  pincode = '';
  submitted = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  enterPin(pin: string) {
    this.pincode += pin;
  }

  validatePin() {
    this.submitted = true;
    if (this.pincode != '1234' && this.pincode != '1010') {
      return;
    }
      else {
        if(this.pincode === '1234'){
          this.router.navigate(['/home','U']);
        }else{
          this.router.navigate(['/home','A']);
        }

      }
    }
  }

