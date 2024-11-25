import { getPosts, createPost, updatePost } from "../content/postsCollection.js"
import fs from "fs"
import gerarDescricaoComGemini from "../services/Gemini.js"

export async function listarPosts(req, res) {
    const posts = await getPosts()
    res.status(200).json(posts)
}

export async function NewPost(req, res) {
    const newPost = req.body;

    try {
        const postCreate = await createPost(newPost)
        res.status(200).json(postCreate)
    } catch (err) {
        res.status(500).json({message: "Não foi possível realizar o post"})
        console.error("Não foi possível realizar o novo post: ", err)
    }
}

export async function uploadImagem(req, res) {
    const newPost = {
        descricao: "",
        ImgURL: req.file.originalname,
        alt: "",
    }

    try {
        const postCreate = await createPost(newPost)
        const imgAtualizada = `uploads/${postCreate.insertedId}.png`
        fs.renameSync(req.file.path, imgAtualizada)
        res.status(200).json(postCreate)
    } catch (err) {
        res.status(500).json({ message: "Não foi possível realizar o post" })
        console.error("Não foi possível realizar o novo post: ", err)
    }
}

export async function UpdatePost(req, res) {
    const id = req.params.id;
    const Img_URL = `http://localhost:3000/${id}.png`

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            ImgURL: Img_URL,
            descricao: descricao,
            alt: req.body.alt,
        }

        const Update = await updatePost(id, post);
        res.status(200).json(Update)
    } catch (err) {
        res.status(500).json({ message: "Não foi possível atualizar o post" })
        console.error("Não foi possível atualizar o post: ", err)
    }
}