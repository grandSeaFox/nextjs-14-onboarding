export type User = {
  $id: string;
  email: string;
  userId: string;
  name: string;
  completed?: boolean;
  formAnswersByStepKey?: string;
  lastCompletedStep?: string;
  totalUsers?: string;
};
export interface getUserInfoProps {
  userId: string;
}
