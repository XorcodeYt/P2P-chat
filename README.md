# 💬 Chat P2P Chiffré avec PeerJS

Un chat **P2P** (peer-to-peer) moderne, **sans backend** et **chiffré** :  
- Pas besoin de serveur, pas d’inscription.  
- Ouvrez simplement le fichier `.html` dans deux navigateurs et commencez à discuter !

---

## ✨ Fonctionnalités

- **Username personnalisable**
- **Connexion par code PeerJS** (copiez/collez l’ID généré)
- **Chiffrement AES-GCM 256 bits** de bout en bout (clé dérivée automatiquement de l’ID de connexion)
- **Interface moderne** (mode sombre, responsive)
- 100 % offline : aucun enregistrement, rien ne transite par un serveur mise a part l'etape de connections qui transite par les serveurs de PeerJS

---

## 🚀 Utilisation

1. **Ouvrez `index.html` dans votre navigateur ou rendez vous sur le [site internet du projet] (https://google.com/)**  

2. **Entrez un pseudo**  
   Il sera affiché à vos interlocuteurs pendant le chat.

3. **Partagez votre ID PeerJS**  
   - Le premier utilisateur copie son ID (zone de gauche).
   - Le second le colle dans la zone de droite et clique sur **Se connecter**.

4. **Discutez en toute confidentialité !**  
   Tous les messages sont automatiquement chiffrés.

---

## 🛡️ Sécurité

- **Chiffrement AES-GCM fort**, clé générée automatiquement à partir du code de connexion PeerJS
- **Aucun message n’est lisible sans ce code**
- **Pas de serveur, pas de stockage**

*⚠️ Si un tiers intercepte votre code PeerJS lors de l’échange, il peut aussi lire vos messages. Protégez ce code !*

---

## ⚠️ Limitations

- **Un seul pair par session (1:1)**
- **Pas d’authentification forte** : évitez de partager votre code PeerJS publiquement
- **Certaines connexions peuvent échouer** (NAT, réseau d’entreprise...)

---

## ❓ Dépannage

- Essayez Chrome **ou** Firefox si un navigateur ne fonctionne pas.
- Rafraîchissez la page et recommencez.
- Vérifiez que l’ID PeerJS est complet et sans espaces.

---

## 🛠 Stack technique

- [PeerJS](https://peerjs.com/) (WebRTC P2P)
- [WebCrypto AES-GCM](https://developer.mozilla.org/fr/docs/Web/API/SubtleCrypto/encrypt)

---

**Juste un fichier HTML à ouvrir, rien à installer, et votre chat chiffré P2P est prêt !**