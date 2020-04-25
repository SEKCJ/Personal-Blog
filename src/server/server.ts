import * as express from 'express';
import * as path from 'path'
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';

import apiRouter from './Routes';

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use(morgan('dev'));

app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));
