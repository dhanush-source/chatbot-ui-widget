// ChatWindow component - main chat window container
import { Header } from './Header.js';
import { MessageList } from './MessageList.js';
import { InputBox } from './InputBox.js';

export class ChatWindow {
  constructor(config) {
    this.config = config;
    this.header = new Header(config);
    this.messageList = new MessageList();
    this.inputBox = new InputBox(config);
  }

  render() {
    return `
      <div class="chatbot-window" id="chatbot-window">
        ${this.header.render()}
        ${this.messageList.render()}
        ${this.inputBox.render()}
      </div>
    `;
  }
}

