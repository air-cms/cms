import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { marked } from "marked";
import { model, Schema } from "mongoose";
import slugify from "slugify";
import { v4 } from "uuid";

//create DOMPurify instance with JSDOM window
const dompurify = DOMPurify(new JSDOM("").window as any);

//the interface for a posts
export interface IPosts {
  _id: string;
  meta: {
    author: string;
    views: number;
    dates: {
      createdAt: number;
      editedAt: number[];
    };
    title: string;
    slug: string;
    description: string;
  };
  content: {
    html: string;
    markdown: string;
  };
  conversations: string[];
}

//the posts schema
const PostsSchema = new Schema<IPosts>({
  _id: {
    default: v4,
    type: String,
    required: true,
  },
  meta: {
    author: {
      type: String,
      required: true,
    },
    views: {
      default: 0,
      type: Number,
      required: true,
    },
    dates: {
      createdAt: {
        default: Date.now,
        type: Number,
        required: true,
      },
      editedAt: {
        default: [],
        type: [Number],
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  content: {
    html: {
      type: String,
      required: true,
    },
    markdown: {
      type: String,
      required: true,
    },
  },
  conversations: {
    default: [],
    type: [String],
    required: true,
  },
});

//pre validating hooks
PostsSchema.pre("validate", function (next) {
  //check that markdown is defined
  if (this.content.markdown) {
    //set html (here will md be transformed to md)
    this.content.html = dompurify.sanitize(marked.parse(this.content.markdown));
  }

  //check that title is defined
  if (this.meta.title) {
    //generate a slug from title and id
    this.meta.slug =
      slugify(this.meta.title, { lower: true, strict: true }) + this._id;
  }

  //call next function
  next();
});

//the posts model
export const PostsModel = model("posts", PostsSchema);
