import { Express } from "express";

import { home } from "../controllers/home.controller";
import { newArticle, createArticle, articleWithSlug, articles, deleteArticleWithId, editArticleWithId, updateArticleWithId, saveArticleAndRedirect } from "../controllers/articles.controller";

const routes = (app: Express) => {
    app.get("/", home);
    app.get("/articles/new", newArticle);
    app.post("/articles/", createArticle, saveArticleAndRedirect("new"));
    app.get("/articles/", articles);
    app.get("/articles/:slug", articleWithSlug);
    app.delete("/articles/:id", deleteArticleWithId);
    app.get("/articles/edit/:id", editArticleWithId)
    app.put("/articles/:id", updateArticleWithId, saveArticleAndRedirect("edit"));
}

export default routes;