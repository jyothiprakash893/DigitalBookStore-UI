import { PaymentStatus } from './payment-status';

export interface PaymentDetails {
  orderId: number;
  userId: number;
  amount: number;
  paymentDate: Date;
  paymentStatus: PaymentStatus;
  remainingCredits?: number;
}