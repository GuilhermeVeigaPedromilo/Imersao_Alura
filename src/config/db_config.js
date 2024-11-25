import { MongoClient } from "mongodb";

export default async function connectionDB(STRING_DATA_CONNECTION) {
    let mongoClient;
    
    try {
        mongoClient = new MongoClient(STRING_DATA_CONNECTION);
        console.log('Conectando ao cluster do DATABASE...')
        await mongoClient.connect();
        console.log("Conectado ao MongoDB ATLAS com sucesso");
        return mongoClient

    } catch (err) {
        console.error("Falha na conexão com o banco!", err)
        process.exit()
    }
}