import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../service/api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  Portfolio: any = [];

  constructor(private apiService: ApiService) {
    this.readPortfolio();
  }

  ngOnInit(): void {
  }
  readPortfolio() {
    this.apiService.getPortfolios().subscribe((data: any) => {
      this.Portfolio = data;
    })
  }

}
