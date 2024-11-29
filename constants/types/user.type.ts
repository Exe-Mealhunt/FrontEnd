export type User = {
  id: string;
  email: string;
  role: string;
  fullName: string;
  subscription: {
    subscriptionPlanId: number;
    endDate: string;
    isCurrent: boolean;
  } | null;
  accessToken: string;
};
