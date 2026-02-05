export type ServiceIcon =
  | "Web"
  | "Accessibility"
  | "Search"
  | "DesignServices"
  | "BarChart"
  | "ShowChart"
  | "Insights"
  | "QueryStats"
  | "StackedLineChart"
  | "Leaderboard"
  | "Analytics"
  | "Collections"
  | "Support"
  | "Storage";

export interface Service {
  title: string;
  description: string;
  price: string;
  cta?: string;
  icon: ServiceIcon;
  value?: string;
}
