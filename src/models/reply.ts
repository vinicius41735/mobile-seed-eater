export interface Reply {
  id: number;
  user_login: string;
  post_id: number | null;
  message: string;
  created_at: string;
  updated_at: string;
}