import { NextFunction, Request, Response } from "express";

import Article from "../models/article.model";

export const newArticle = (req: Request, res: Response) => {
    res.status(200).render("articles/new", { article: new Article() });
}

export const createArticle = async (req: Request, res: Response, next: NextFunction) => {
    req.article = new Article();
    next();
}

export const articles = (req: Request, res: Response) => {
    res.redirect("/");
}

export const articleWithSlug = async (req: Request, res: Response) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article == null) return res.redirect("/");
    res.render("articles/show", { article: article });
}

export const deleteArticleWithId = async (req: Request, res: Response) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
}

export const editArticleWithId = async (req: Request, res: Response) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
}

export const updateArticleWithId = async (req: Request , res: Response, next: NextFunction) => {
  req.article = await Article.findById(req.params.id);
  next();
}

export const saveArticleAndRedirect = (path: string) => {
  return async (req: Request, res: Response) => {
    let article = req.article;

      article!.title = req.body.title;
      article!.description = req.body.description;
      article!.markdown = req.body.markdown;
    
      try {
        article = await article!.save();
        res.redirect(`/articles/${article.slug}`);
      } catch (e) {
        console.error(e);
        res.render(`articles/${path}`, { article: article});
      }
    }
}