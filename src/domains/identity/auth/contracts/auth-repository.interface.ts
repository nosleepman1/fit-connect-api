export interface AuthRepositoryInterface {
  saveVerificationCode(userId: string, code: string): Promise<string>;

  getVerificationCode(userId: string): Promise<string | null>;

  deleteVerificationCode(userId: string): Promise<void>;
}
