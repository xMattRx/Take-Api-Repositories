import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import routes from './routes';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(routes)

export default app