export class Foo {
  public message: string;

  constructor(message: string) {
    this.message = message;
  }

  public showMessage(): string {
    return `Hello, ${this.message}!`;
  }
}
