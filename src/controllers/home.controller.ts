import { Request, Response } from "express";

import Article from "../models/article.model";

export const home = async (req: Request, res: Response) => {
    const article = await Article.find().sort({ createdAt: "desc" });
    res.status(200).render("articles/index", {articles: article });
} 