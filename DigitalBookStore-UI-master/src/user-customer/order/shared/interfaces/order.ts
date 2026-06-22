import { CartItem } from './cart-item';
import { PaymentStatus } from './payment-status';
import { TrackingDetails } from './tracking-details';
import { ReturnDetails } from './return-details';

export interface Order {
  orderId: number;
  orderDate: Date;
  totalAmount: number;
  status: string;
  userId: number;
  bookIds: string[];
  paymentStatus: PaymentStatus;
  trackingDetails?: TrackingDetails;
  returnDetails?: ReturnDetails;
  estimatedDeliveryDate?:Date;
  books?: CartItem[]; // Frontend-only, might be populated from getBooksByOrderId
}