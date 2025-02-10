# ✅ TASK API (With TDD)

A scalable API for managing tasks, built with a Test-Driven Development (TDD) approach.

## 🚀 Features

- 💻 **Artificial intelligence for creating tasks from free speech**
- 📝 **Create, Read, Update, and Delete (CRUD) tasks**
- 🧪 **Fully tested with TDD methodology**
- 🔒 **User authentication & authorization**
- 📌 **Category-based task organization**
- ✅ **Task completion tracking**

## 🛠️ Technologies

- **💻 Backend:** Node.js, Express.js
- **📱 Database:** SQLite, TypeORM
- **🔍 Testing:** Jest, Supertest

## 📦 Installation

```bash
git clone https://github.com/luisstarlino/NodeJs-TDD
cd NodeJs-TDD
npm install
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=3000
OPENAI_API_KEY=your_openAI_secret
```

## ▶️ Running the API

### Development Mode

```bash
npm run dev #or yarn dev
```

### Running Tests

```bash 
npm test #or yarn test
```


## 📖 API Documentation

### 🔹 Get All Posts

```http
GET /api/posts
```

Response:

```json
[
 {
    "post_id": "11f8ad35-c86c-49dc-9c8b-ef31cb1e758f",
    "author": "user@dio.me",
    "content": "User about DIO"
  },
  {
    "post_id": "bcb12d42-a99f-4c96-9bf4-070802c961a4",
    "author": "luis@gmail.com",
    "content": "Updated!"
  }
]
```

### 🔹 Create a Post

```http
POST /api/post
```

Request:

```json
{
  "author":"luis.starlino@gmail.com",
  "content": "create this post!"
}
```

Response:

```json
{
  "id": "2",
  "author": "luis.starlino@gmail.com",
  "content": "create this post!"
}
```

### 🔹 Create Posts By AI
```http
POST /api/posts/ai
```

Request:

```json
{
 "content": "Tomorrow i have to go to the market, to buy the week's fruit, visit my father on the way back and then pick up the children from school",
  "author": "test@ai.com"
}
```
Response:

```json
{
  "message": "All done, created 3 tasks",
  "tasks": [
    {
      "post_id": "b2832611-be86-4916-9d0b-fc01c5c4f535",
      "author": "test@ai.com",
      "content": "go to the market to buy the week's fruit"
    },
    {
      "post_id": "e8b1bc8a-b2cc-4e38-b78e-db48dc5a3127",
      "author": "test@ai.com",
      "content": "visit my father on the way back"
    },
    {
      "post_id": "8ad5a6b9-cdd6-4643-acb7-52a97b85daaa",
      "author": "test@ai.com",
      "content": "pick up the children from school"
    }
  ]
}
```

*For more details, check the full API documentation.*

## 🎯 Contributing

Feel free to submit issues and pull requests! 🚀

## 📜 License

This project is licensed under the MIT License.

---

🔥 **Task API (With TDD) – A scalable, test-driven approach to task management!**

