import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(
    private router: Router,
    private ngZone: NgZone
  ){
  }
  onSubmit() {
    this.ngZone.run(() => this.router.navigateByUrl('/login'))
  }
  
  /* submitted = false;
  portfolioForm!: FormGroup;
  imageData!: string;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }


  ngOnInit(): void {
  }
  mainForm() {
    this.portfolioForm = this.fb.group({
      client: ['', [Validators.required]],
      location: ['', [Validators.required]],
      budget: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      surface_area: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sector: ['', [Validators.required]],
      construction: ['', [Validators.required]],
      project_description: ['', [Validators.required]],
      important_facts: ['', [Validators.required]],
      image: ['']
    })
  }

  get myForm() {
    return this.registerForm.controls;
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.registerForm.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      return false;
    } else {
      this.apiService.createuser(this.getregisterAsFormData(this.registerForm.value)).subscribe(
        (res) => {
          console.log('User successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/login'))
        }, (error) => {
          console.log(error);
        });
      return;
    }
  }

  getPortfolioAsFormData(_portfolioFormGroup: any): FormData {
    const formData = new FormData();
    formData.append('image', _portfolioFormGroup.image);
    formData.append('client', _portfolioFormGroup.client);
    formData.append('location', _portfolioFormGroup.location);
    formData.append('budget', _portfolioFormGroup.budget);
    formData.append('surface_area', _portfolioFormGroup.surface_area);
    formData.append('sector', _portfolioFormGroup.sector);
    formData.append('construction', _portfolioFormGroup.construction);
    formData.append('project_description', _portfolioFormGroup.project_description);
    formData.append('important_facts', _portfolioFormGroup.important_facts);
    return formData;
  } */

}