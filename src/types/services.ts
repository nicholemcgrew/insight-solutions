export interface Service {
  title: string;
  description: string;
  price: string;
  cta?: string;          
  icon: "Web" | "Accessibility" | "Search" | "DesignServices" | "BarChart" | "Collections" | "Support" | "Storage";  // ← add "Storage" here
  value?: string;
}