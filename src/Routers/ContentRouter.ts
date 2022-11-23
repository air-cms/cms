import { Router } from "express";
import { PostsModel } from "../Models/PostsModel";

//the content router
export const ContentRouter = Router();

//get all posts
ContentRouter.get("/posts", async (req, res) => {

});

async function getPost(id: string) {

}