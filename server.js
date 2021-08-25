// 외부접근
//const cors = require('cors');

// express 객체
const express = require('express'); // express js
const app = express();

// 파일전송
const multer = require('multer'); // 파일 업로드 객체
const upload = multer({dest: './upload'}); // 업로드 위치
app.use('/images', express.static('./upload')); // /images url을 ./upload로 매핑

// 데이터유형과 인코딩 및 디코딩
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 라우팅
const route = require('./routes/index');
app.use('/api', route);

// 포트 수신
const port = process.env.PORT || 5001;
app.listen(port, () => console.log('Listening on port = ', port));
