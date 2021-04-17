import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  submitted = false;
  contactForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.mainForm();
  }
  mainForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    })
  }
  get myForm() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.contactForm.valid) {
      return false;
    } else {
      this.apiService.createMessage(this.contactForm.value).subscribe(
        (res) => {
          window.alert('Message Sent!')
          console.log('message sent successfully!')
          this.contactForm.reset();
          this.ngZone.run(() => this.router.navigateByUrl('/contact'))
        }, (error) => {
          console.log(error);
        });
      return;
    }
  }
}
