
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/custom-toastr.service';
import { UserService } from '../../services/userservice';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: CustomToastrService,
    private userService: UserService
  ) {
    this.frm = this.formBuilder.group({
      firstname: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      passwordconfirm: ["", [Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        const password = group.get("password")?.value;
        const passwordconfirm = group.get("passwordconfirm")?.value;
        return password === passwordconfirm ? null : { notSame: true };
      }
    });
  }

  frm: FormGroup;

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  
  async onSubmit(user: User) {
    this.submitted = true;
  
    if (this.frm.invalid) {
      this.toastrService.message("Passwords are not the same", "Register Error", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
      return; 
    }
  
    if (this.component['password'].value !== this.component['passwordconfirm'].value) {
      this.toastrService.message("Passwords do not match", "Register Error", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
      return; // Şifreler eşleşmiyorsa işlemi durdur
    }
  
    const result = await this.userService.Create(user);
    if (result) { // result varsa, yani kayıt başarılı olduysa
      this.toastrService.message("Register Success", "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    } else { // result yoksa, yani kayıt başarısız olduysa
      this.toastrService.message("Register Error", "Error", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
    }
    
  
}
}