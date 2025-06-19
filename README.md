# 💬 P2P Encrypted Chat with PeerJS

A modern, **peer-to-peer encrypted chat** with **no backend**.

- **Live Demo:** [https://p2-p-chat-eight.vercel.app/](https://p2-p-chat-eight.vercel.app/)
- No server, no sign-up required.
- Just open the `.html` file in two browsers, or use the online version to start chatting!

---

## ✨ Features

- **Customizable username**
- **Connect via PeerJS code** (copy/paste the generated ID)
- **End-to-end AES-GCM 256-bit encryption** (key is derived automatically from the connection code)
- **Modern, dark, responsive interface**
- 100% offline: no logging, nothing passes through a server

---

## 🚀 How to Use

1. **Try it right now with the [online demo on Vercel](https://p2-p-chat-eight.vercel.app/) OR open `index.html` in your browser**
   Works with Chrome and Firefox. If you encounter issues, try both

2. **Choose a username**  
   This name will appear in the chat.

3. **Share your PeerJS ID**  
   - The first user copies their ID (left column).
   - The second user pastes it into the right column and clicks **Connect**.

4. **Start chatting, securely!**  
   All messages are automatically encrypted.

---

## 🛡️ Security

- **Strong AES-GCM encryption**, with the key automatically derived from the shared PeerJS code
- **Messages are unreadable without the code**
- **No server, no storage**

*⚠️ If someone intercepts your PeerJS code during exchange, they can also read your messages. Only share your code with people you trust!*

---

## ⚠️ Limitations

- **One-to-one chat only (1:1)**
- **No strong authentication**: do not share your PeerJS code publicly
- **Some connections may fail** (due to NAT, corporate networks, etc.)

---

## ❓ Troubleshooting

- Try with both Chrome **and** Firefox if one browser doesn't work.
- Refresh the page and try again.
- Make sure the PeerJS ID is complete and has no spaces.

---

## 🛠 Tech Stack

- [PeerJS](https://peerjs.com/) (WebRTC P2P)
- [WebCrypto AES-GCM](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt)

---

**Just open the HTML file, or use the [live demo](https://p2-p-chat-eight.vercel.app/):  
no install needed, and your P2P encrypted chat is ready!**