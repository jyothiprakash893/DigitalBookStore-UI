export interface ReturnDetails {
    returnId: number;
    orderId: number;
    returnReason: string;
    returnRequestedDate: Date;
    returnApprovedDate?: Date;
    returnRejectedDate?: Date;
  }