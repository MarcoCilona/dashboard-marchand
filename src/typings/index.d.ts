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

  export interface Recap {
    amount: string;
    status: string;
  }
}
