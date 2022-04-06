  import { ArticleInterface } from "./models/article.model";

declare module "express" {
  export interface Request {
    article?: ArticleInterface | null
  }
}