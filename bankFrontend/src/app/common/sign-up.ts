export class SignUp {
  email!: string;
  password!: string;
  pfp!: string;

  constructor(email: string, password: string, base64Image: string) {
    this.email = email;
    this.password = password;
    this.pfp = base64Image;
  }
}
