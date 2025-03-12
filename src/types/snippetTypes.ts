export interface ISnippet {
  id?: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  expiresAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
