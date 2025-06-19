const peer = new Peer({
  config: {
    iceServers: [
      {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:global.relay.metered.ca:80",
        username: "a97fd3a4f8c9592fbb10eac4",
        credential: "pi3gSvNSb+u/lKMh",
      },
      {
        urls: "turn:global.relay.metered.ca:80?transport=tcp",
        username: "a97fd3a4f8c9592fbb10eac4",
        credential: "pi3gSvNSb+u/lKMh",
      },
      {
        urls: "turn:global.relay.metered.ca:443",
        username: "a97fd3a4f8c9592fbb10eac4",
        credential: "pi3gSvNSb+u/lKMh",
      },
      {
        urls: "turns:global.relay.metered.ca:443?transport=tcp",
        username: "a97fd3a4f8c9592fbb10eac4",
        credential: "pi3gSvNSb+u/lKMh",
      }
    ],
    iceTransportPolicy: "relay",
  }
});
let conn = null;
let username = null;
let aesKey = null;
const loginScreen = document.getElementById('loginScreen');
const mainChat = document.getElementById('mainChat');
const usernameInput = document.getElementById('usernameInput');
const setUsernameBtn = document.getElementById('setUsernameBtn');
const currentUsername = document.getElementById('currentUsername');
const messages = document.getElementById('messages');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const offerOut = document.getElementById('offerOut');
const offerIn = document.getElementById('offerIn');

async function deriveKeyFromSecret(secret) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw", enc.encode(secret), "PBKDF2", false, ["deriveKey"]);
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("peerjs-p2p-chat"),
      iterations: 120_000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptMsg(key, msg) {
  const enc = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv }, key, enc.encode(msg)
  );
  const buf = new Uint8Array(iv.length + ciphertext.byteLength);
  buf.set(iv, 0);
  buf.set(new Uint8Array(ciphertext), iv.length);
  return btoa(String.fromCharCode(...buf));
}

async function decryptMsg(key, str) {
  const bin = Uint8Array.from(atob(str), c => c.charCodeAt(0));
  const iv = bin.slice(0, 12);
  const ct = bin.slice(12);
  const dec = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv }, key, ct
  );
  return new TextDecoder().decode(dec);
}

function setStatus(text, state = "") {
    const el = document.getElementById('status');
    el.textContent = text;
    el.className = "status-indicator" + (state ? " " + state : "");
}

setUsernameBtn.onclick = () => {
    const input = usernameInput.value.trim();
    if (!input) return alert("Please choose a username.");
    username = input;
    loginScreen.classList.add("animate-out");
    setTimeout(() => {
    loginScreen.style.display = "none";
    mainChat.style.display = "block";
    mainChat.classList.add("animate-in");
    currentUsername.textContent = username;
    }, 450);
};

usernameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') setUsernameBtn.onclick();
});

function log(msg, sender = '🧑‍💻') {
    const div = document.createElement('div');
    div.textContent = `${sender}: ${msg}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

document.getElementById('startBtn').onclick = async () => {
    const otherId = offerIn.value.trim();
    if (!otherId) return alert("Please enter a valid ID.");
    aesKey = await deriveKeyFromSecret(offerIn.value);
    conn = peer.connect(otherId);
    setupConnection();
};

offerIn.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('startBtn').onclick();
});

sendBtn.onclick = async () => {
    const msg = msgInput.value;
    if (msg && conn?.open && aesKey) {
        const toSend = JSON.stringify({ user: username, msg });
        const encrypted = await encryptMsg(aesKey, toSend);
        conn.send(encrypted);
        log(msg, "Moi");
        msgInput.value = '';
    }
};

msgInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendBtn.onclick();
});

peer.on('open', async id => {
    offerOut.value = id;
    setStatus("Pending...", "pending");
    aesKey = await deriveKeyFromSecret(offerOut.value);
});

peer.on('connection', incomingConn => {
    conn = incomingConn;
    setupConnection();
    setStatus("Connected", "connected");
});

function setupConnection() {
    conn.on('open', () => {
    setStatus("Connected", "connected");
    });
    conn.on('data', async data => {
        let text, sender = "👤";
        try {
            const decrypted = await decryptMsg(aesKey, data);
            const d = JSON.parse(decrypted);
            text = d.msg;
            sender = d.user || "👤";
        } catch (e) {
            text = "[Decryption error]";
            sender = "⚠️";
        }
        log(text, sender);
    });
    conn.on('close', () => {
    setStatus("Disconnected", "");
    log("Please refresh the page before reconnect", "⚠️");
    });
    conn.on('error', err => {
    console.error("Connection error :", err);
    setStatus("failed", "failed");
    });
}

document.getElementById('copyIdBtn').onclick = () => {
const id = offerOut.value.trim();
if (!id) return;
navigator.clipboard.writeText(id)
    .then(() => {
    })
    .catch(() => {
    alert("Unable to copy ID.");
    });
};