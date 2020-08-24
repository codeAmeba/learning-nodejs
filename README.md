# Learning Node.js

## 교재

- [Node.js 웹개발로 알아보는 백엔드 자바스크립트의 이해](https://www.inflearn.com/course/node-js-%EC%9B%B9%EA%B0%9C%EB%B0%9C#)
- [Node.js 교과서](http://www.yes24.com/Product/Goods/91213376)
- [Node.js로 프로그래밍 시작하기](http://www.yes24.com/Product/Goods/86429845)
- [Node.js](https://nodejs.org/ko/about/)
- [Express](https://expressjs.com/ko/starter/installing.html)

## Node.js는 무엇인가

Node.js는 브라우저가 아닌 곳에서 JavaScript를 실행할 수 있도록 하는 실행환경(Runtime)이다. 이를 통해 클라이언트와 동일한 언어(JavaScript)로 서버를 실행할 수 있다.

## Node는 기본적으로 비동기

```javascript
const express = require('express');
const app = express();
app.listen(3000, () => {
  console.log('start server');
});

console.log('end of server');
```

위와 같이 입력한 후 서버를 실행하면, 콘솔에는 'end of server'가 먼저 찍히는 것을 볼 수 있다. 그것은 `app.listen()`에 'start server'가 콜백으로 전달됐기 때문이고, 그말은 곧 비동기로 실행된다는 말이다. 따라서, `app.listen()` 이후의 실행코드는 서버가 구동할 때까지 기다리지 않고 먼저 실행된다.

## Node.js에서도 화살표 함수 가능

Node.js v4부터는 ES6 문법을 지원한다. 따라서 화살표 함수, const, let, promise 등도 당연히 사용 가능하다.
다만 모듈을 불러올 때에는 React처럼 import / export 키워드를 바로 쓸 수 없다. 기본적으로 CommonJS 문법을 따르기 때문에 `const express = require('express')`와 같이 작성해야 하며 import / export 키워드를 쓰기 위해서는 확장자를 `.js`가 아닌 `.mjs`로 써야 한다.

## Nodemon의 용도

Node.js로 작업을 하며 매번 코드를 수정을 할 때마다 수정사항을 반영하기 위해 서버를 껐다, 켰다 반복하는 것은 매우 번거로운 일이다. 그렇기 때문에 수정사항이 발생했을 때 자동으로 서버를 재실행 해주는 플러그인이 필요한데 그것이 Nodemon이다. 일반적으로 글로벌로 설치하여 사용한다. 그리고, 글로벌 설치에는 보통 권한을 요구하기 때문에 `sudo`를 붙여 설치한다.

```bash
sudo npm i -g nodemon
```

## GET

GET 요청은 default 값이다. 내가 리액트에서 API 요청을 할 때에도 GET의 경우는 별도의 method를 붙이지 않았다.

Node.js에는 이러한 GET 요청에 따라 response를 할 수 있는 `get()`이라는 메서드가 존재하며, 이 또한 콜백함수로써 request / response 두 인자를 받는다. 간단한 메시지만 response로 보낼 때에는 `res.send('hi')` 이런 식으로 `send()` 메서드를 활용할 수 있고, 요청에 따른 파일을 보내야 할 때에는 `sendfile()`이라는 메서드를 활용한다. 그리고, 이때 전달하는 파일의 경로는 **절대경로** 이기 때문에 path가 길어질 수밖에 없는데, 다행히 Node.js에서 제공되는 변수인 `__dirname`을 통해 상당 부분은 생략이 가능하다.

```javascript
app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});
```

### static

요청에 따라 전달한 html 파일에는 연결된 다른 파일들이 있을 것이다. 그러한 파일들 역시 함께 전달해야 온전한 렌더링이 이루어지는데, 그렇다고 해서 일일이 `sendfile()` 메서드를 붙이는 작업을 하기에는 번거롭다. 따라서 자동으로 특정 디렉토리의 파일들을 함께 보내주도록 설정을 해줘야 하는데 이때 사용하는 것이 `static()`이다.

```javascript
app.use(express.static('public'));
```

## POST

GET은 서버에서 클라이언트로 요청받은 파일을 보내주기만 하면 되지만, POST는 클라이언트에서 작성된 데이터를 서버에서 받아 처리해야 한다. 따라서 이때는 전달받은 데이터를 처리할 수 있는 도구가 필요한데 그것이 `body parser`다.

`npm install body-parser --save`

설치가 완료되면, express 서버에게도 body-parser를 사용하겠다는 의사를 표명해야 한다.

```javascript
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

`use()` 메서드를 활용하여 두 번에 걸쳐 설정을 했는데, 보통 데이터가 JSON 형태로 오기 때문에 `bodyParser.json()`을 설정했고, `urlencoded`의 경우, 한글로 이루어진 URL은 인코딩이 필요하기에 설정하는 것이 좋다.

## Template

클라이언트로부터 받은 데이터를 기반하여 바로 화면(view)을 구성할 수 있는 템플릿(Template)라는 것이다. 대표적인 문법으로는 `ejs`가 있는데, 사용하기에 앞서 관련 패키지를 설치해야 하며,

```bash
npm install ejs --save
```

아래와 같이 서버파일에 어떤 방식으로 화면을 구성할 것인지 설정을 해주어야 한다.

```javascript
app.set('view engine', 'ejs');

app.post('/email_post', (req, res) => {
  console.log(req.body.email);
  // res.send('<h1>Welcome ' + req.body.email + '</h1>');
  res.render('email.ejs', { email: req.body.email });
});
```

찾아보니 React의 `jsx` 문법을 템플릿으로 활용할 수도 있다는 것 같다. 완강 후에 꼭 시도해봐야겠다.

- [express-react-views](https://github.com/reactjs/express-react-views)

## CORS

ajax를 통한 POST를 연습하다가 CORS(Cross Origin Resource Sharing)에 의한 통신오류를 만났다. CORS는 현재의 도메인과 다른 도메인으로 리소스를 요청할 경우를 의미하는데, 웹 개발을 하다 보면 가장 흔하게 만나게 되는 오류 중 하나라고 알고있다. 이러한 CORS 오류의 원인에는 보안 상의 이유로 브라우저에서 제한하기 때문이며, 공교롭게도 SPA의 경우는 RESTful API를 통해 비동기 통신으로 주로 이루어지기에 필연적으로 CORS에 제한이 걸린다.

위와 같은 이유들로 CORS 제한을 해제해줄 필요가 있는데, 서버의 응답 헤더의 설정을 `Access-Control-Allow-Origin: *` 이렇게 변경해주는 방법도 있지만, 이미 훌륭한 모듈이 있기에 아래와 같이 설치해주자.

```bash
npm install cors --save
```

그리고, 서버파일에서 모듈을 불러온다.

```javascript
const cors = require('cors');

app.use(cors());

app.get('/form.html', (req, res, next) => {
  res.json({ msg: 'this is CORS-enabled for all origins' });
});

app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80');
});
```
