import { Component } from '@angular/core';
import { Dto } from '../../interfaces/dto';
import { MockService } from '../../services/mock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
user: Dto | null = null;

  constructor(private mockService: MockService) {}

  ngOnInit() {
    this.mockService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }
}
