import { SignUp } from './sign-up';

describe('SignUp', () => {
  it('should create an instance', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAU...';

    const signUpInstance = new SignUp(email, password, base64Image);
    expect(signUpInstance).toBeTruthy();
  });
});
