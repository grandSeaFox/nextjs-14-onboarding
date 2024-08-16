import { User } from '@/lib/types/user';

export interface SuccessResponse {
  success: true;
  data?: User | any;
}

export interface ErrorResponse {
  success: false;
  message: string;
}

export type ApiResponse = SuccessResponse | ErrorResponse;

export interface SidebarLink {
  id: string;
  imgURL?: string;
  route: string;
  label: string;
  routes?: SidebarLink[];
}
