import express from 'express';
import multer from 'multer';
import route from './router';

const app = express();

// * file upload using multer
const upload = multer({dest: './upload'});
app.use('/images', express.static('./upload'));

// * enocoding & json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// * routing
app.use('/api', route);

// * proxy port/
const port = process.env.PORT || 5001;
app.listen(port, () => console.log('Listening on port= ', port));
