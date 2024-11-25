import 'dotenv/config'
import { ObjectId } from "mongodb";
import connectionDB from "../config/db_config.js";

// Conexão ao database
const connection = await connectionDB(process.env.DATA_CONNECTION);

export async function getPosts() {
    try {
        const db = connection.db("Imersao-Alura");
        const colecao = db.collection("posts");
        return colecao.find().toArray();
    } catch (err) {
        console.error("Falha na conexão com a coleção posts!", err)
        process.exit()
    }
}

export async function createPost(newPost) {
  const db = connection.db("Imersao-Alura");
  const colecao = db.collection("posts");
  return colecao.insertOne(newPost);
}

export async function updatePost(id, post) {
    const db = connection.db("Imersao-Alura");
    const colecao = db.collection("posts");
    const objetcID = ObjectId.createFromHexString(id)
    return colecao.updateOne({ _id: new ObjectId(objetcID) }, { $set: post })  
}