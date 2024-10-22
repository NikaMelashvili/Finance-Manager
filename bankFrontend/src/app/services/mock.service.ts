import { Injectable } from '@angular/core';
import { Dto } from '../interfaces/dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  private currentUser: Dto | null = null;
  private testUsers: Dto[] = [
    {
      id: 1,
      email: 'user1@test.com',
      password: 'password1',
      image:
        'https://images.pexels.com/photos/28824456/pexels-photo-28824456/free-photo-of-woman-in-white-shirt-looking-out-from-glass-door.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      name: 'Giorgi',
      surname: 'giorgadze',
      balance: 3000,
      income: 2500,
      expenses: {
        family: 200,
        cashout: 50,
        transfer: 100,
        health: 150,
        restaurants: 75,
        shopping: 100,
        transport: 80,
      },
      answer: 404.0,
    },
    {
      id: 2,
      email: 'user2@test.com',
      password: 'password2',
      image:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Ana',
      surname: 'giorgadze',
      balance: 1500,
      income: 3000,
      expenses: {
        family: 250,
        cashout: 60,
        transfer: 120,
        health: 200,
        restaurants: 100,
        shopping: 150,
        transport: 90,
      },
      answer: 404.0,
    },
    {
      id: 3,
      email: 'user3@test.com',
      password: 'password3',
      image:
        'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Mikheil',
      surname: 'giorgadze',
      balance: 6425,
      income: 2000,
      expenses: {
        family: 180,
        cashout: 40,
        transfer: 90,
        health: 130,
        restaurants: 60,
        shopping: 70,
        transport: 50,
      },
      answer: 404.0,
    },
    {
      id: 4,
      email: 'user4@test.com',
      password: 'password4',
      image:
        'https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Nino',
      surname: 'giorgadze',
      balance: 1364,
      income: 2200,
      expenses: {
        family: 200,
        cashout: 80,
        transfer: 110,
        health: 160,
        restaurants: 90,
        shopping: 140,
        transport: 75,
      },
      answer: 404.0,
    },
  ];

  private currentUserSubject = new BehaviorSubject<Dto | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  getTestUsers(): Dto[] {
    return this.testUsers;
  }

  validateUser(email: string, password: string): Dto | null {
    const user = this.testUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUserSubject.next(user); // Update currentUserSubject
    }
    return user || null;
  }

  getTestId(id: number): Dto | undefined {
    return this.testUsers.find((user) => user.id === id);
  }

  getCurrentUser(): Dto | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: Dto): void {
    this.currentUserSubject.next(user);
  }
}
