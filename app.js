import express from "express"
import { indexRoute } from "./src/routes/index.router.js"

class App {
    
    constructor(){
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true})),
        this.config = this.app.use("/", indexRoute)
    }

    start(port){
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    }
}

export default new App().app