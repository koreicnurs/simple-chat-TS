"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let lastDate;
const getMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    const urlGetMessage = 'http://146.185.154.90:8000/messages';
    const response = yield fetch(urlGetMessage);
    const arrayGet = yield response.json();
    for (let a of arrayGet) {
        let blockAuthor1 = `
                          <div class="card" style="width: 100%;">
                              <div class="card-body">
                                  <p class="card-title"><b>Author:</b> ${a.author}</p>
                                  <p class="card-date"><b>Date:</b> ${a.datetime}</p>
                                  <p class="card-text"><b>Message:</b> ${a.message}</p>
                              </div>
                          </div>
                          `;
        document.body.querySelector('.container-messages').insertAdjacentHTML('beforeend', blockAuthor1);
    }
    lastDate = arrayGet[arrayGet.length - 1].datetime;
    yield getLastMessage(lastDate);
    setInterval(yield getLastMessage, 6000);
});
const getLastMessage = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const getLastUrl = `http://146.185.154.90:8000/messages?datetime=${lastDate}`;
    const resp = yield fetch(getLastUrl);
    const last = yield resp.json();
    if (last.length > 0) {
        lastDate = last[last.length - 1].datetime;
        for (let l of last) {
            let blockAuthor = `
          <div class="card" style="width: 100%;">
              <div class="card-body">
                  <p class="card-title"><b>Author:</b> ${l.author}</p>
                  <p class="card-date"><b>Date:</b> ${l.datetime}</p>
                  <p class="card-text"><b>Message:</b> ${l.message}</p>
              </div>
          </div>
          `;
            document.body.querySelector('.container-messages').insertAdjacentHTML('afterbegin', blockAuthor);
        }
    }
    else {
        return;
    }
});
const btn = document.querySelector('.btn-post');
const autor = document.querySelector('.author');
const message = document.querySelector('.message');
btn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const body = new URLSearchParams();
    body.append('author', autor.value);
    body.append('message', message.value);
    fetch('http://146.185.154.90:8000/messages', {
        method: 'POST',
        body
    });
}));
getMessage();
