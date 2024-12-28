import {Component, OnInit} from '@angular/core';
import {FinanceDataResponse} from "../../common/finance-data-response";

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [],
  template: `
    <h2>Finance Data</h2>
    <table class="finance-table">
      <thead>
      <tr>
        <th *ngFor="let header of tableHeaders">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let data of financialDataList">
        <td *ngFor="let header of tableHeaders">{{ data[header] }}</td>
      </tr>
      </tbody>
    </table>
`,
  styles: `
    .finance-table {
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

    .finance-table th,
    .finance-table td {
      padding: 12px 15px;
      border: 1px solid #ddd;
    }

    .finance-table tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    .finance-table tbody tr:hover {
      background-color: #f1f1f1;
    }
  `
})
export class UserDataComponent implements OnInit {

  protected financialDataList: FinanceDataResponse[] | undefined;

  protected tableHeaders: string[] = Object.keys(new FinanceDataResponse());

  constructor() {
  }

  ngOnInit(): void {
    this.financialDataList = [];
  }

  loadUserFinancialData(): void {
    // TODO
  }
}
