import { Component, OnInit } from '@angular/core';
import { Portfolio } from './../../../model/portfolio';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../../service/api.service';
@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit {

  Portfolio: any = [];

  constructor(
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) {

  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPortfolio(id);
  }

  getPortfolio(id: string | null) {
    this.apiService.getPortfolio(id).subscribe((data: { [x: string]: any; }) => {
      this.Portfolio = data;
    });
  }
}
