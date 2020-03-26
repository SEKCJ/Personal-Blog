import * as express from 'express';
import apiRouter from './routes';
import * as path from 'path'

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.get(["/", "/blogs/:id", "/admin/post", "/admin/edit/:id"], (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
