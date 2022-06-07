declare namespace DashboardMarchand {
  export interface Merchant {
    name: string;
  }

  export interface Payment {
    status: string;
    id: string;
    created: number;
    customer_name: string;
    merchant: Merchant;
    amount: number;
    installmentsCount: number;
  }

  export interface PaymentDetail {
    status: string;
    id: string;
    created: number;
    customer_name: string;
    merchant: Merchant;
    amount: number;
    installmentsCount: number;
    paymentPlan: PaymentPlan[];
  }

  export interface PaymentPlan {
    id: string;
    due_date: number;
    status: string;
    amount: number;
    fee: number;
  }

  export interface Recap {
    amount: string;
    status: string;
  }
}
