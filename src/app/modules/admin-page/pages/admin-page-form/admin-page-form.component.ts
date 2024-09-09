import { Component, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminPageService } from '../../services/admin-page.service';
import { Router } from '@angular/router';
import { User } from '../../../user/models/user';

@Component({
  selector: 'app-admin-page-form',
  templateUrl: './admin-page-form.component.html',
  styleUrl: './admin-page-form.component.css',
})
export class AdminPageFormComponent implements OnDestroy {
  userForm!: FormGroup;
  interestsFormArray!: FormArray;
  sub: Subscription | undefined;
  passwordLength: number = 8;

  constructor(
    private fb: FormBuilder,
    private adminPageService: AdminPageService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl(''),
      interests: this.fb.array([this.fb.control('')]),
      password: new FormControl(this.generatePassword()),
      email: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]{11}$'),
      ]),
      isActive: new FormControl(true),
      isAdmin: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private generatePassword(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_+-';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < this.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.adminPageService.getUsers().subscribe({
        next: (users: User[]) => {
          const formValue = this.userForm.value;
          const newId: string = (users.length + 1).toString();
          const user: User = {
            id: newId,
            userName: formValue.userName,
            firstName: formValue.firstName,
            middleName: formValue.middleName,
            lastName: formValue.lastName,
            birthDate: formValue.birthDate,
            interests: formValue.interests,
            password: formValue.password,
            email: formValue.email,
            mobileNumber: formValue.mobileNumber,
            isActive: formValue.isActive,
            isAdmin: formValue.isAdmin,
          };

          const request = this.adminPageService.addUser(user);

          this.sub = request.subscribe({
            next: () => {
              this.router.navigate(['/admin-page']);
            },
          });
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onClear(): void {
    this.userForm.reset({
      userName: '',
      firstName: '',
      middleName: '',
      lastName: '',
      birthDate: '',
      interests: [''],
      password: this.generatePassword(),
      email: '',
      mobileNumber: '',
      isActive: true,
      isAdmin: '',
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin-page']);
  }
}
