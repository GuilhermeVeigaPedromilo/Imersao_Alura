import express from "express"
import multer from "multer";
import cors from "cors"
import { listarPosts, NewPost, uploadImagem, UpdatePost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200 
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest: "./uploads", storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions))

    app.get("/posts", listarPosts);
    app.post("/post", NewPost);
    app.post("/upload", upload.single("imagem"), uploadImagem)
    app.put("/upload/post/:id", UpdatePost)
}

export default routes;