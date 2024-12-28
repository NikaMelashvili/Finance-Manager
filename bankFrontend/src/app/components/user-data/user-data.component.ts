import { Component, OnInit } from '@angular/core';
import { FinanceDataResponse } from "../../common/finance-data-response";
import { ProfileService } from "../../services/profile.service";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Finance Data</h2>
    <table class="finance-table">
      <thead>
      <tr>
        <th>Income</th>
        <th>Savings</th>
        <th>Credit Usage</th>
        <th>Load Balance</th>
        <th>Monthly Spending</th>
        <th>Investment Portfolio</th>
        <th>Credit Score</th>
        <th>Debt To Income Ratio</th>
        <th>Monthly Essentials</th>
        <th>Monthly Discretionary</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let data of financialDataList">
        <td>{{ data.income }}</td>
        <td>{{ data.savings}}</td>
        <td>{{ data.creditUsage}}</td>
        <td>{{ data.loadBalance}}</td>
        <td>{{ data.monthlySpending}}</td>
        <td>{{ data.investmentPortfolio}}</td>
        <td>{{ data.creditScore}}</td>
        <td>{{ data.debtToIncomeRatio}}</td>
        <td>{{ data.monthlyEssentials}}</td>
        <td>{{ data.monthlyDiscretionary}}</td>
      </tr>
      </tbody>
    </table>
  `,
  styles: [
    `.finance-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 16px;
      text-align: left;
    }
    .finance-table thead tr {
      background-color: #f4f4f4;
      border-bottom: 2px solid #ddd;
    }
    .finance-table th, .finance-table td {
      padding: 12px 15px;
      border: 1px solid #ddd;
    }
    .finance-table tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .finance-table tbody tr:hover {
      background-color: #f1f1f1;
    }`
  ]
})
export class UserDataComponent implements OnInit {

  protected financialDataList: FinanceDataResponse[] | undefined;

  private email: string = '';

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    this.email = this.authService.currentUserEmail;
    this.financialDataList = [];
    if (this.email) {
      this.loadUserFinancialData(this.email);
    } else {
      console.error('User email is not set for financial data.');
    }
  }

  loadUserFinancialData(email: string): void {
    this.profileService.loadUserFinancialData(email).subscribe({
      next: (response) => {
        // @ts-ignore
        this.financialDataList = response;
      },
      error: (error) => {
        console.error("Couldn't load user financial data:", error);
      },
    });
  }
}
