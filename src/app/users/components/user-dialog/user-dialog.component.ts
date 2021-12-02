import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Gender, User, UserDialogMode } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'eei-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private usersService: UsersService,
    private renderer: Renderer2
  ) { }

  @ViewChild('avatarPreview', { static: true }) avatarPreview!: ElementRef;

  oneDayMilliseconds = 1000 * 60 * 60 * 24;
  birthdateMax = new Date((new Date()).getTime() - this.oneDayMilliseconds);

  gender = Object.values(Gender);
  form!: FormGroup;
  subscription = new Subscription();
  isEmailValid = false;
  imgFile: string = '';

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.validateEmail()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.fb.group({
      avatar: [null],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      birthdate: [null],
      gender: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      mobile: [null],
      address: [null]
    })

    this.setFormValues();
  }

  setFormValues(): void {

    const { user, mode } = this.data;
    if (mode === UserDialogMode.update) {
      this.form.patchValue({
        ...user
      })

      if (user?.avatar) {
        this.imgFile = user?.avatar;
        this.setAvatarPreview();
      }
      this.isEmailValid = true;
    }
  }

  submit(): void {
    this.dialogRef.close(this.form.value);
  }

  validateEmail(): void {
    this.subscription.add(this.email.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.isEmailValid = !this.usersService.isEmailExists(this.form.value as User);
      }));
  }

  onImageChange(e: any) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;

        this.setAvatarPreview();

        this.form.patchValue({
          avatar: this.imgFile
        })
        // this.uploadForm.patchValue({
        //   imgSrc: reader.result
        // });

      };
    }
  }

  setAvatarPreview() {
    this.renderer.setStyle(this.avatarPreview.nativeElement, 'background-image', `url(${this.imgFile})`);
  }

  get email(): AbstractControl {
    return this.form.controls['email'];
  }

}
