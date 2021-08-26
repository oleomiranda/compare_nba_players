import * as express from "express"
import control from "../controller/control"

const app = express()


app.get("/", control.index)

app.get("/compare", control.comparator)

app.listen(8081, () => console.log('RODANDO...'))