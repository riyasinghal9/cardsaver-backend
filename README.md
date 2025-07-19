# CardSaver Backend

A backend service that detects and stores bank offers from an e-commerce payment page, and helps users identify the best discount available for their payment method.

---

## ✅ 1. Project Setup Instructions

### 📦 Prerequisites
- Node.js (v16+)
- PostgreSQL (installed and running)

---

### ⚙️ Environment Setup

Create a `.env` file in the root of your project:

```
DB_NAME=cardsaver
DB_USER=postgres
DB_PASS=password
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

---

### 📥 Install Dependencies

```bash
npm install
```

---

### 🛠️ Run Migrations / Initialize Database

On first run, Sequelize will automatically create the required tables based on models.

```bash
npm start
```

---

### ▶️ Start the Server

```bash
npm start
```

You should see:

```
Database connected
Server running on port 3000
```

---

## 💡 2. Assumptions Made

- Offers have a unique `id` that identifies them.
- Offers apply based on:
  - `bankName` (e.g., AXIS, HDFC)
  - `paymentInstrument` (e.g., CREDIT, EMI_OPTIONS)
- Discounts can be:
  - Flat (`FLAT`)
  - Percentage (`PERCENTAGE`) — optionally capped via `maxDiscountAmount`
- Duplicate offers are not inserted again.
- The Flipkart offer API response is mimicked using a mock JSON structure.

---

## 🧠 3. Design Choices

### 🧩 Framework

- **Node.js + Express**: Lightweight, fast to develop, and widely adopted.

### 🗃️ Database

- **PostgreSQL with Sequelize ORM**
  - Structured, relational model ideal for offer data
  - Sequelize simplifies DB creation, validation, and querying

### 🧱 Structure

- Clean modular codebase with folders:
  - `routes/`, `controllers/`, `models/`, `utils/`
- Discount calculator supports both flat and percentage-based logic

---

## ⚖️ 4. Scaling `GET /highest-discount` to 1,000 RPS

To scale this endpoint efficiently:

- ✅ Add **indexes** on `bankName` and `paymentInstrument`
- ✅ Use **Redis caching** for repeated queries
- ✅ Enable **connection pooling** in Sequelize
- ✅ Use a **load balancer** (e.g., NGINX)
- ✅ **Containerize** with Docker and deploy across instances with Kubernetes or ECS

---

## ⏳ 5. Improvements If Given More Time

- ✅ Add unit/integration tests using **Jest** or **Mocha**
- ✅ Implement a **cron job** to sync offers from Flipkart periodically
- ✅ Add **user management** and **admin panel**
- ✅ Add `GET /offers` with **pagination**
- ✅ Integrate **Swagger/OpenAPI** documentation
- ✅ **Dockerize** for container-based deployment

---

## 📡 Example API Usage

### 🔹 POST `/offer`
Stores Flipkart offers into the database.

**Request Body:**

```json
{
  "flipkartOfferApiResponse": [
    {
      "id": "OFFER001",
      "title": "10% off with AXIS Credit Card",
      "bankName": "AXIS",
      "discountType": "PERCENTAGE",
      "discountValue": 10,
      "maxDiscountAmount": 750,
      "paymentInstrument": "CREDIT"
    }
  ]
}
```

**Response:**

```json
{
  "noOfOffersIdentified": 1,
  "noOfNewOffersCreated": 1
}
```

---

### 🔹 GET `/highest-discount`
Returns the best discount available for the given payment details.

**Example Request:**
```
GET /highest-discount?amountToPay=10000&bankName=AXIS&paymentInstrument=CREDIT
```

**Response:**

```json
{
  "highestDiscountAmount": 750
}
```

---

Thank you!





