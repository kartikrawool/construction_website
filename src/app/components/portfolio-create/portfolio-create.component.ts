import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";

@Component({
  selector: 'app-portfolio-create',
  templateUrl: './portfolio-create.component.html',
  styleUrls: ['./portfolio-create.component.css']
})
export class PortfolioCreateComponent implements OnInit {

  submitted = false;
  portfolioForm!: FormGroup;
  imageData!: string;
  // EmployeeProfile:any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

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

  // // Choose designation with select dropdown
  // updateProfile(e){
  //   this.portfolioForm.get('designation').setValue(e, {
  //     onlySelf: true
  //   })
  // }

  // Getter to access form control
  get myForm() {
    return this.portfolioForm.controls;
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.portfolioForm.patchValue({ image: file });
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
    if (!this.portfolioForm.valid) {
      return false;
    } else {
      this.apiService.createPortfolio(this.getPortfolioAsFormData(this.portfolioForm.value)).subscribe(
        (res) => {
          console.log('Portfolio successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/portfolio-list'))
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
  }

}
