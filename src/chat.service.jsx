export class ChatService {
  constructor() {
    this.base_url =
      "http://client.nomokoiw.beget.tech/web/task4/controller.php?";
  }

  get(url) {
    return fetch(url).then(response => {
      if (response.ok) {
        // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        return response.json();
      } else {
        console.error("Ошибка HTTP: " + response.status);
      }
    });
  }

  post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (response.ok) {
          // если HTTP-статус в диапазоне 200-299
          // получаем тело ответа (см. про этот метод ниже)
          return response.json();
        } else {
          console.error("Ошибка HTTP: " + response.status);
        }
      });
  }

  signIn(login) {
    const url = `${this.base_url}key=sign-in&login=${login}`;
    return this.get(url);
  }
  createChat(chat) {
    const url = `${this.base_url}key=create-chat`;
    return this.post(url, chat);
  }
  getChat(id) {
    const url = `${this.base_url}key=get-chat-by-id&chat_id=${id}`;
    return this.get(url);
  }
  sendMessage(message) {
    const url = `${this.base_url}key=send-message`;
    return this.post(url, message);
  }
}

export default ChatService;
