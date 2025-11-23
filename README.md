# 📱 TaskEarnSomali – Reward & Earning App  
**App ku siinaya lacag adigoo qabanaya tasks sida video watching, surveys, offerwalls, app downloads, iyo shaqooyin kale oo mustaqbalka lagu dari karo adoon codeka wax ka beddelin.**

---

## 🚀 Features-ka Appka (User Side)
### ✔️ Login & Signup  
- Email Login (Supabase Auth)  
- Email Verification  
- Device Lock (1 device = 1 account)

### ✔️ Home / Dashboard  
- Balance  
- Total Earnings  
- Top Offers  
- Tasks Categories

### ✔️ Tasks  
Appku wuxuu taageeraa dhamaan noocyada tasks:
- 🎥 Video watching  
- 📱 App download  
- 📝 Surveys (CPX Research)  
- 🧱 Offerwalls (AyeT, Monlix)  
- 🔗 Social tasks (Follow, Like, Comment)  
- 🏆 Custom Tasks (Admin-ka soo sameeyo nooc kasta)

### ✔️ Withdraw System  
- Hababka lacag bixinta: ZAAD, EVC, eDahab, Sotelco  
- Manual Approval (Admin Panel)  
- History: Pending, Paid, Rejected

### ✔️ Referral System  
- Referral code gaar ah  
- 10% bonus on friend earnings  
- 50 points signup reward  

---

## 🎛️ Admin Panel Features (Web Admin)
- Login / Protected Route  
- Add Task (No code update needed)  
- Ban User  
- Approve/Reject Withdrawals  
- Edit global settings (conversion rate, min withdraw, maintenance mode)  
- View all users, IPs, devices  
- View all tasks / earnings / submissions  

---

## 🛡️ Security & Anti-Fraud  
Appku wuxuu leeyahay 15+ security layers:
1. Device Lock  
2. VPN Detection  
3. Country Filtering  
4. IP Logging  
5. Rate Limiting  
6. Postback Verification (server confirms tasks)  
7. Backend-only rewards (frontend cannot add points)  
8. Cloudflare Proxy  
9. JWT Protection  
10. Anti-clone check  
11. Encrypted Device ID  
12. Server-side validation  
13. Tamper-proof task execution  
14. Withdraw double-check  
15. Secure RLS Policies (Supabase)

---

## 🧱 Technology Stack  
### 📲 **Frontend (Mobile App)**
- React Native (Expo)
- AsyncStorage
- React Navigation
- Expo Image Picker
- Expo Clipboard
- Expo Linking  
- LocalState → Supabase → Backend (upgrade ready)

### 🌐 **Backend (Server)**
- Node.js (Express)
- Supabase SDK
- Anti-cheat middleware
- Withdraw verification layer

### 🗄️ **Database**
- Supabase (PostgreSQL)
- SQL tables:
  - users  
  - tasks  
  - task_submissions  
  - referrals  
  - withdraws  
  - settings  

---

## 📦 Folder Structure

```
TaskEarnSomali/
│
├── frontend/
│    ├── App.js
│    ├── package.json
│    ├── app.json
│    └── assets/
│
├── backend/
│    ├── server.js
│    ├── package.json
│    ├── .env
│    └── controllers/
│
└── supabase/
     ├── schema.sql
     ├── policies.sql
     └── readme.md
```

---

## 🛠️ Installation (Frontend - Expo)

```bash
npm install
npm start
```

Ama:
```bash
expo start
```

---

## 🛠️ Installation (Backend - Node.js)

```bash
npm install
node server.js
```

---

## 🔑 Environment Variables (.env)

```
SUPABASE_URL=your-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role
JWT_SECRET=your-secret
ADMIN_SECRET=custom-admin-password
```

---

## 🧪 Testing The App  
Waxaad tijaabin kartaa frontend:

👉 https://snack.expo.dev  

Waxaad tijaabin kartaa backend:

👉 https://replit.com  

Waxaad 24/7 ka dhigi kartaa:

👉 https://uptimerobot.com  

---

## 📤 APK Build (Expo → APK)
Si aad APK u sameyso:

```bash
npx expo export --platform android
```

Ama:

```bash
expo build:android
```

---

## 🧑‍💻 About  
Mashruucan waxaa loo dhisay si uu u noqdo:
- ✔️ Secure  
- ✔️ Expandable  
- ✔️ Longevity (mustaqbal 5 sano shaqeyn)  
- ✔️ Clone-proof  
- ✔️ Easy for admin to update  

---

## ❤️ Thanks  
Waxaad sameyn doontaa app EARNING real ah.  
Wax kasta oo kaa maqan waxaan kuu diyaarin doonaa.
