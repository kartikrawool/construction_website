import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {

  Portfolio: any = [];

  constructor(private apiService: ApiService) {
    this.readPortfolio();
  }

  ngOnInit(): void {
  }
  readPortfolio() {
    this.apiService.getPortfolios().subscribe((data) => {
      this.Portfolio = data;
    })
  }

  removePortfolio(portfolio: { _id: any; }, index: any) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deletePortfolio(portfolio._id).subscribe((data) => {
        this.Portfolio.splice(index, 1);
      }
      )
    }
  }

}
