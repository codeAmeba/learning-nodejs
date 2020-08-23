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
var express = require('express');
var app = express();
app.listen(3000, function () {
  console.log('start server');
});

console.log('end of server');
```

위와 같이 입력한 후 서버를 실행하면, 콘솔에는 'end of server'가 먼저 찍히는 것을 볼 수 있다. 그것은 `app.listen()`에 'start server'가 콜백으로 전달됐기 때문이고, 그말은 곧 비동기로 실행된다는 말이다. 따라서, `app.listen()` 이후의 실행코드는 서버가 구동할 때까지 기다리지 않고 먼저 실행된다.
