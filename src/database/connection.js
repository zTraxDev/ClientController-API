import MongoDB from "mongoose"

class Database {
    constructor() {
        this.uri = process.env.URI
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