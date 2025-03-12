export interface ISnippet {
  title: string;
  code: string;
  language: string;
  tags: string[];
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
