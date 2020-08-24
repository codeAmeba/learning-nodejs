const submit = document.querySelector('.searchInput');

submit.addEventListener('click', () => {
  const inputData = document.querySelector('.searchInput').value;
  sendAjax('http://127.0.0.1:3000/ajax_send_keyword', inputData);
});

const sendAjax = (url, data) => {
  let myData = { keyword: data };
  myData = JSON.stringify(myData);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(myData);
  xhr.addEventListener('load', () => {
    const result = JSON.parse(xhr.responseText);
    if (result.result !== 'ok') return;
    document.querySelector('.result').innerHTML = result.text;
  });
};
