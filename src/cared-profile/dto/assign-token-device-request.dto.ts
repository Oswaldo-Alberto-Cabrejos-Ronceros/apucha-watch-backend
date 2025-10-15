import { IsNotEmpty } from 'class-validator';

export class AssignTokenDeviceRequest {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  deviceToken: string;
}
