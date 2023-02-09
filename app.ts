let lastDate: string;

const getMessage = async () => {

    const urlGetMessage = 'http://146.185.154.90:8000/messages';

    const response = await fetch(urlGetMessage);
    const arrayGet = await response.json();

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

        document.body.querySelector('.container-messages')!.insertAdjacentHTML('beforeend', blockAuthor1);
    }

    lastDate = arrayGet[arrayGet.length - 1].datetime;

    await getLastMessage(lastDate)

    setInterval(await getLastMessage, 6000);

}

const getLastMessage = async (date: string) => {

    const getLastUrl = `http://146.185.154.90:8000/messages?datetime=${lastDate}`;

    const resp = await fetch(getLastUrl);
    const last = await resp.json();

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

          document.body.querySelector('.container-messages')!.insertAdjacentHTML('afterbegin', blockAuthor);
        }

    } else {
        return
    }

}

const btn = document.querySelector('.btn-post')!;
const autor: HTMLInputElement = document.querySelector('.author')!;
const message: HTMLTextAreaElement = document.querySelector('.message')!;

btn.addEventListener('click', async () => {

    const body = new URLSearchParams();

    body.append('author', autor.value);

    body.append('message', message.value);

    fetch('http://146.185.154.90:8000/messages', {
        method: 'POST',
        body
    });

})

getMessage();