export class PostEntity {
  id!: string;
  title!: string;
  description!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
  userId!: string;
}
