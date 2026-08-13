# AskMyNotes

A full-stack web application to ask questions about uploaded notes.

## Tech Stack
- **Frontend:** React + Vite (Purple gradient theme)
- **Backend:** FastAPI (Python)
- **Deployment:** Docker + Docker Compose

## Project Structure
```
askmynotes/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Backend container
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Purple theme styles
│   │   ├── main.jsx         # React entry point
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── nginx.conf           # Nginx config for production
│   └── Dockerfile           # Frontend container
├── docker-compose.yml       # Orchestrates both services
├── .gitignore
└── README.md
```

## Local Development (Docker)

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/askmynotes.git
cd askmynotes

# 2. Start both services
docker-compose up --build

# 3. Open in browser
# Frontend: http://localhost:3000
# Backend:  http://localhost:8000/health
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/ask`   | Upload file + question |
| GET    | `/health`| Health check |

## Response Format
```json
{
  "answer": "back-end received successfully"
}
```

## Deployment (Render / Railway / AWS)

### Backend (Render)
1. Push code to GitHub
2. Create New Web Service on Render
3. Select Docker environment
4. Set Root Directory: `backend`
5. Deploy → Get URL like `https://askmynotes-api.onrender.com`

### Frontend (Render / Vercel)
1. Create New Static Site
2. Build Command: `npm run build`
3. Publish Directory: `frontend/dist`
4. Set Environment Variable: `VITE_API_URL=https://your-backend-url`

## Environment Variables

Create `.env` in `frontend/` for local dev:
```
VITE_API_URL=http://localhost:8000
```

## Demo Flow
1. Open frontend URL
2. Type a question
3. Upload a `.txt` or `.pdf`
4. Click **Ask**
5. See: **"back-end received successfully"**
