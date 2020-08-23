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
