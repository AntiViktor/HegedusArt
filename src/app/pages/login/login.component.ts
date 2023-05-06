import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    loginForm = this.formBuilder.group({
        email: [''],
        password: ['']
    });
    
    loading: boolean = false;
    
    constructor(
        private router: Router, 
        private formBuilder: FormBuilder,
        private authService: AuthService
        ) { }
        
        ngOnInit(): void {
            this.addValidators();
        }
        
        login(){
            // this.loading = true;
            // if (this.loginForm.valid){
            //   if (this.loginForm.controls['email'].value === "test@gmail.com" && this.loginForm.controls['password'].value === "testpw"){
            //     this.router.navigateByUrl('/main');
            //   }else{
            //     console.error('Wrong credidentials!');
            //   }
            // }else{
            //   window.alert('Helytelenül töltötted ki a mezőket!');
            // }
            // this.loading = false;
            
            this.loading = true;
            this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
                .then(cred => {
                    console.log(cred);
                    this.router.navigateByUrl('/main');
                }).catch(err => {
                    console.error(err);
                }).finally(() => {
                    this.loading = false;
                });
        }
        
        addValidators() {
            let emailRegex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
            this.loginForm.get('email')?.addValidators([Validators.required, Validators.pattern(emailRegex)]);
            this.loginForm.get('password')?.addValidators([Validators.required, Validators.minLength(5)]);
        }
        
    }
    