import MongoDB from "mongoose"
import { devMode } from "../../config.js"

class Database {
    constructor() {
        this.uri = devMode ? process.env.URI : process.env.DEV_URI
    }

    async connect(){
        try{
            await MongoDB.connect(this.uri)
            console.log("Connected to MongoDB")
        }catch(E){
            console.log(E)
            process.exit(1)
        }
    }

    async close(){
        await MongoDB.connection.close()
        console.log("Disconnected from MongoDB")
    }
}

export default new Database().connect()