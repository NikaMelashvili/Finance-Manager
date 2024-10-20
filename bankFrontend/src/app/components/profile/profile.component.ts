import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Dto } from '../../interfaces/dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MockService } from '../../services/mock.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, AfterViewInit{
  route: ActivatedRoute = inject(ActivatedRoute);
  userID = 0;

  displayAnswer = false;
  loading = false;

  
  mock = inject(MockService);
  user: Dto | undefined;
  chart: any;

  constructor() {
    // Register all necessary Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit() {
    const userID = Number(this.route.snapshot.params['id']);
    this.user = this.mock.getTestId(userID);

    if (this.user) {
      this.mock.setCurrentUser(this.user);
    }
  }

  ngAfterViewInit() {
    this.createChart(); // Create the chart after the view is initialized
  }

  createChart() {
    if (this.user && this.user.expenses) {
      const labels = Object.keys(this.user.expenses); // Get the keys of the expenses
      const data = Object.values(this.user.expenses); // Get the values of the expenses
  
      interface ChartDataSet {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
      }
  
      const dataset: ChartDataSet = {
        label: 'Expenses',
        data: data as number[], // Ensure data is treated as an array of numbers
        backgroundColor: [
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Teal
          '#9966FF', // Purple
          '#FF9F40', // Orange
          '#FF5733'  // Tomato
        ],
        borderColor: [
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF'
        ],
        borderWidth: 2
      };
  
      new Chart('myChart', {
        type: 'doughnut', // Change to doughnut or pie
        data: {
          labels: labels,
          datasets: [dataset]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 10,
                padding: 20,
                generateLabels: (chart) => {
                  const data = chart.data;
                  if (data.labels && data.labels.length && data.datasets.length) {
                    return data.labels.map((label, i) => {
                      const value = data.datasets[0].data[i] as number; // Ensure value is treated as a number
                      return {
                        text: `${label}: $${typeof value === 'number' ? value : 0}`, // Ensure value is a number
                        fillStyle: (data.datasets[0].backgroundColor as string[])[i], // Cast to string[] for safety
                        hidden: isNaN(value), // Use value directly
                        index: i
                      };
                    });
                  }
                  return []; // Return an empty array if labels or datasets are not defined
                }
              }
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const label = tooltipItem.label || '';
                  const value = tooltipItem.raw !== null ? tooltipItem.raw : 0; // Ensure value is a number
                  return `${label}: $${value}`; // Display label and value in tooltip
                }
              }
            }
          }
        }
      });
    }
  }
  
  showAnswer() {
    this.displayAnswer = false; // Hide the answer initially
    this.loading = true; // Start loading animation

    setTimeout(() => {
      this.loading = false; // Stop loading animation
      this.displayAnswer = true; // Show the answer
    }, 3000); // 3 seconds delay
  }
}
