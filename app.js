import dotenv from "dotenv"
import express from "express"
import { indexRoute } from "./src/routes/index.router.js"
import session from "express-session"
import passport from "./src/config/passport.config.js"
import MongoStore from "connect-mongo"
import { config } from "./config.js"
class App {
    
    constructor(){
        this.dotenv = dotenv.config();
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true})),
        this.app.use(session({
            secret: process.env.SECRET_KEY,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: process.env.URI,
                ttl: config.SESION_ALIVE_TIME
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                secure: false,
            }
        })),
        this.app.use(passport.initialize()),
        this.app.use(passport.session()),
        this.config = this.app.use("/", indexRoute)
    }

    start(port){
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    }
}

export default new App().app