# **findymail-ts**

![npm](https://img.shields.io/npm/v/findymail-ts) ![license](https://img.shields.io/npm/l/findymail-ts)

> **TypeScript wrapper for the [Findymail](https://findymail.com) API** – strongly‑typed, promise‑based, zero‑dependency runtime (uses the native Fetch API).

## ✨ Features

* **Full TypeScript typings** for every request and response
* Elegant wrapper around all main Findymail endpoints
* Automatic bearer‑token injection & JSON parsing
* Overload‑aware helpers for webhook vs. direct responses
* Tiny bundle size – no Axios or other heavy deps

---

## 📦 Installation

```bash
npm install findymail-ts
# or
yarn add findymail-ts
```

> **Requires Node 18+** (for built‑in Fetch). If you need Node <18, polyfill with `undici` or `node-fetch`.

---

## 🚀 Quick Start

```ts
import { FindymailClient } from "findymail-ts";

const findy = new FindymailClient({
  apiKey: process.env.FINDYMAIL_API_KEY!,
});

// Verify an email
const result = await findy.verifyEmail({ email: "john@example.com" });
console.log(result.verified); // true / false
```

---

## 🔌 API Reference

| Method                                          | Description                                      |
| ----------------------------------------------- | ------------------------------------------------ |
| `verifyEmail({ email })`                        | Verify a single email address                    |
| `getList()`                                     | Fetch all contact lists on your account          |
| `createList(name)`                              | Create a new list                                |
| `updateContactList(params, id)`                 | Rename/share an existing list                    |
| `deleteList(id)`                                | Delete a list                                    |
| `getSavedContacts(listId)`                      | Get contacts stored in a list                    |
| `findFromName({ name, domain, [webhook_url] })` | Find a contact by name & domain                  |
| `findFromDomain(params)`                        | Find contacts by domain (overloaded – see below) |
| `findFromLinkedin(params)`                      | Find contact by LinkedIn profile URL             |
| `getLinkedinProfile({ linkedin_url })`          | Scrape public LinkedIn profile data              |
| `findEmployees({ website, job_titles, count })` | Discover employees from a company site           |
| `findPhone({ linkedin_url })`                   | Extract phone number from a LinkedIn profile     |
| `getRemainingCredits()`                         | Check your remaining / verifier credits          |

### Overloaded **`findFromDomain`**

```ts
// 1️⃣ Synchronous – returns contacts immediately
const res = await findy.findFromDomain({
  domain: "openai.com",
  roles: ["ceo", "founder"],
});
// res.contacts -> Contact[]

// 2️⃣ Asynchronous – delivers via webhook
await findy.findFromDomain({
  domain: "openai.com",
  roles: ["marketing"],
  webhook_url: "https://yourapp.com/webhook/findymail",
});
// Returns: { payload: { contacts: Contact[] } }
```

### Error Handling

All methods will **throw** on non‑200 responses, with the message provided by Findymail:

```ts
try {
  await findy.verifyEmail({ email: "bad@example.com" });
} catch (e) {
  // "Not enough credits"  |  "Subscription is paused"  | etc.
  console.error(e);
}
```

---

## 🛠️ Building from source

```bash
git clone https://github.com/imranKhanTsx/findymail-ts.git
cd findymail-ts
npm install
npm run build
```

The build step emits **ES2020 CommonJS** plus `*.d.ts` files into `dist/` (via `tsup`).

---

## 🤝 Contributing

1. Fork & clone 🎉
2. `npm install`
3. Create a feature branch
4. Add/adjust tests (coming soon)
5. Submit a PR – we love contributions!

---

## 📄 License

MIT © 2025 Imran Khan
