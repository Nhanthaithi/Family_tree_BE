export interface CashTrackingType {
  id: number;
  dayCash?: Date;
  description?: string;
  genealogyTree?: { id: number };
  money?: number;
  selectCash?: number;
}

export interface CashTrackingTypegetAll {
  startDate?: string;
  endDate?: string;
}
