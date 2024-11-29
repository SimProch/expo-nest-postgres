export class GetUserResponseDto {
  public email: string;
  public phoneNumber: string;
  public cities: {
    city: string;
    postalCode: string;
  }[];
}
