export class User {
  public readonly id: number;
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phoneNumber: string;
  public readonly createDate: string;
  public readonly updateDate: string;

  public constructor(params: Partial<User> = {}) {
    const {
      id,
      email,
      firstName = '',
      lastName = '',
      phoneNumber = '',
      createDate = '',
      updateDate = '',
    } = params;

    this.id = id!;
    this.email = email!;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.createDate = createDate;
    this.updateDate = updateDate;
  }
}
