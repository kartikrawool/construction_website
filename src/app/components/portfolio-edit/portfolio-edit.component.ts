import { Portfolio } from './../../model/portfolio';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.css']
})
export class PortfolioEditComponent implements OnInit {

  submitted = false;
  editForm!: FormGroup;
  portfolioData!: Portfolio[];
  imageData: string = '';
  //EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updatePortfolio();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPortfolio(id);
    this.editForm = this.fb.group({
      client: ['', [Validators.required]],
      location: ['', [Validators.required]],
      budget: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      surface_area: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sector: ['', [Validators.required]],
      construction: ['', [Validators.required]],
      project_description: ['', [Validators.required]],
      important_facts: ['', [Validators.required]],
      imagePath: [''],
      // image: [''],
    });
  }

  // Choose options with select-dropdown
  // updateProfile(e) {
  //   this.editForm.get('designation').setValue(e, {
  //     onlySelf: true
  //   })
  // }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getPortfolio(id: string | null) {
    this.apiService.getPortfolio(id).subscribe((data: { [x: string]: any; }) => {
      this.editForm.patchValue({
        client: data['client'],
        location: data['location'],
        budget: data['budget'],
        surface_area: data['surface_area'],
        sector: data['sector'],
        construction: data['construction'],
        project_description: data['project_description'],
        important_facts: data['important_facts'],
        imagePath: data['imagePath'],
      });
    });
  }

  updatePortfolio() {
    this.editForm = this.fb.group({
      client: ['', [Validators.required]],
      location: ['', [Validators.required]],
      budget: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      surface_area: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sector: ['', [Validators.required]],
      construction: ['', [Validators.required]],
      project_description: ['', [Validators.required]],
      important_facts: ['', [Validators.required]],
      imagePath: [''],
      // image: [''],
    })
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.editForm.patchValue({ image: file });
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
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updatePortfolio(id, this.editForm.value)
          .subscribe((res: any) => {
            this.router.navigateByUrl('/portfolio-list');
            console.log('Content updated successfully!')
          }, (error: any) => {
            console.log(error)
          })
      }
      return;
    }
  }
  getPortfolioAsFormData(_portfolioFormGroup: any): FormData {
    const formData = new FormData();

    formData.append('client', _portfolioFormGroup.client);
    formData.append('location', _portfolioFormGroup.location);
    formData.append('budget', _portfolioFormGroup.budget);
    formData.append('surface_area', _portfolioFormGroup.surface_area);
    formData.append('sector', _portfolioFormGroup.sector);
    formData.append('construction', _portfolioFormGroup.construction);
    formData.append('project_description', _portfolioFormGroup.project_description);
    formData.append('important_facts', _portfolioFormGroup.important_facts);
    formData.append('imagePath', _portfolioFormGroup.imagePath);
    // if (this.imageData != '') {
    //   formData.append('image', _portfolioFormGroup.image);
    // }
    return formData;
  }

}
