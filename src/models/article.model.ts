import mongoose, { Document } from "mongoose";
import { marked } from "marked";
import slugify from "slugify";
import createDomPurify from "dompurify";
import { JSDOM } from "jsdom";

const dompurify = createDomPurify(new JSDOM().window as unknown as Window);

export interface ArticleInterface extends Document {
  title: string;
  createdAt: Date;
  description: string;
  markdown: string;
  slug: string;
  sanitizedHtml: string;
}

const articleSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    markdown: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(Date.now()),
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    sanitizedHtml: {
      type: String,
      required: true,
    }
})

articleSchema.pre("validate", function(next) {
  if (this.title) {
    this.slug = slugify(`${this.title} ${this.id.slice(0, 6)}`, {
      lower: true,
      strict: true,
    });

    if (this.markdown) {
      this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
  }

  next();
});

const Article = mongoose.model<ArticleInterface>("Article", articleSchema);

export default Article;