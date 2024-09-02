import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminPageService } from '../../services/admin-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../user/models/user';

@Component({
  selector: 'app-admin-page-form',
  templateUrl: './admin-page-form.component.html',
  styleUrl: './admin-page-form.component.css'
})
export class AdminPageFormComponent {
  userForm!: FormGroup;
  userId?: number;
  interestsFormArray!: FormArray;
  sub: Subscription | undefined;
  
  constructor(
    private fb: FormBuilder,
    private adminPageService: AdminPageService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.userForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl(''),
      interests: this.fb.array([this.fb.control('')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('',Validators.required),
      mobileNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]{11}$')]),
      isActive: new FormControl(true),
      isAdmin: new FormControl(false)
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      const blog = this.adminPageService.getUserById(this.userId).subscribe({
        next: (user: User) => {
          this.userForm.patchValue({
              userName: user.userName,
              firstName: user.firstName,
              middleName: user.middleName,
              lastName: user.lastName,
              birthDate: user.birthDate,
              interests: user.interests,
              password: user.password,
              email: user.email,
              mobileNumber: user.mobileNumber,
              isActive: user.isActive,
              isAdmin: user.isAdmin
            });
        }}
      );
    }
  }

  // get interest(): FormArray {
  //   return this.userForm?.get('interests') as FormArray;
  // }

  // addInterest(): void {
  //   this.interestsFormArray?.controls.push(new FormControl(''));
  // }

  // removeInterest(index: number): void {
  //   this.interestsFormArray?.removeAt(index);
  // }

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
            isAdmin: formValue.isAdmin
          };
          
          const request =  this.adminPageService.addUser(user);
          
          this.sub = request.subscribe({
            next: () => {
              this.router.navigate(['/admin-page']);
            }
          })
        }
      })
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
      password: '',
      email: '',
      mobileNumber: '',
      isActive: true,
      isAdmin: false
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin-page']);
  }
 
}

