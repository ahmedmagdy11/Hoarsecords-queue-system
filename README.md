# Task Queue NestJS App

## 🚀 Overview
This NestJS application provides a simple task queue system using **BullMQ**. It supports adding tasks, retrieving failed tasks (Dead Letter Queue - DLQ), and clearing the DLQ.

## 📌 Features
- Add tasks to a queue with optional delay.
- Retrieve failed tasks from the **DLQ**.
- Clear the **DLQ** when needed.

---

## 🛠 Installation
### 1️⃣ Clone the Repository
```sh
git clone git@github.com:ahmedmagdy11/Hoarsecords-queue-system.git
cd Hoarsecords-queue-system
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a **.env** file in the root directory and add the following:
```env
MAX_RETRIES=2
```

### 4️⃣ Start Redis Server
Make sure you have Redis running locally.
```sh
docker run -d --name redis -p 6379:6379 redis
```

### 5️⃣ Run the Application
#### Development Mode
```sh
npm run start:dev
```
---

## 🎯 API Endpoints
### 1️⃣ Add a Task
**POST /**
#### Request Body:
```json
{
  "type": "task-type",
  "payload": { "key": "value" },
  "visibility_time": "2024-02-15T12:00:00Z"
}
```
#### Response:
```json
{
  "id": "123456",
  "status": "task added successfully"
}
```

NOTE: To make a task fail add `"payload": {"fail": true}`
---

### 2️⃣ Get Failed Tasks (DLQ)
**GET /dlq**
#### Response:
```json
[
  {
    "id": "123456",
    "type": "task-type",
    "payload": { "key": "value" },
    "error": "Failure reason"
  }
]
```

---

### 3️⃣ Clear DLQ
**DELETE /dlq**
#### Response:
```json
{
  "status": "DLQ cleared"
}
```

---

## 📚 Technologies Used
- **NestJS** (Backend framework)
- **BullMQ** (Queue management)
- **Redis** (Queue storage)

