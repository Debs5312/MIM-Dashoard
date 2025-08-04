# MIM-Dashboard

**Major Incident Management Dashboard** - A comprehensive web application for managing and tracking major incidents across enterprise applications. This dashboard provides teams with tools to handle incident triage, priority classification, and real-time incident monitoring.

## 🚀 Features

- **Real-time Incident Management**: Create, update, and track major incidents
- **Priority-based Classification**: Categorize incidents by P1/P2 priority levels
- **Interactive Dashboard**: Modern React-based UI with responsive design
- **RESTful API**: Node.js backend with Express framework
- **Cross-platform Support**: CORS enabled for seamless frontend-backend integration
- **Logging & Monitoring**: Built-in request logging and middleware support

## 🏗️ Architecture

### Frontend (MIM-DashBoard UI)
- **Framework**: React 19 with Vite build tool
- **State Management**: MobX for reactive state management
- **Styling**: CSS modules with responsive design
- **HTTP Client**: Axios for API communication
- **Development Server**: Vite dev server with hot reload

### Backend (BackEnd)
- **Runtime**: Node.js with Express.js framework
- **Architecture**: RESTful API with middleware pattern
- **CORS**: Enabled for cross-origin requests
- **Logging**: Custom middleware for request logging
- **Port**: 3000 (configurable)

## 📋 Prerequisites

- **Node.js**: v14 or higher
- **npm**: Comes with Node.js
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone [repository-url]
cd MIM-Dashboard
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd BackEnd

# Install dependencies
npm install

# Start the server
npm start
# or
node server.js
```

The backend server will start on `http://localhost:3000`

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd MIM-DashBoard UI

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173` (default Vite port)

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/incident
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all incidents |
| GET | `/p1` | Get P1 priority incidents |
| GET | `/p2` | Get P2 priority incidents |
| GET | `/p1/list` | Get P1 incidents list |
| GET | `/p2/list` | Get P2 incidents list |

### Sample API Response
```json
[
  {
    "incidentId": "INC001",
    "priority": "P1",
    "status": "Open",
    "description": "Critical system outage",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

## 🎯 Usage

1. **Start the Backend**: Ensure the Node.js server is running on port 3000
2. **Launch Frontend**: Open the React application in your browser
3. **View Incidents**: The dashboard displays all incidents with priority filtering
4. **Monitor Status**: Real-time updates for incident status and priority changes

## 📁 Project Structure

```
MIM-Dashboard/
├── BackEnd/                 # Node.js backend
│   ├── controllers/         # API controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── Data/                # Sample data
│   └── server.js            # Server entry point
├── MIM-DashBoard UI/        # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── models/          # Frontend models
│   │   └── stores/          # State management
│   └── public/              # Static assets
├── Backend-Test/            # Backend tests
└── README.md               # This file
```

## 🧪 Testing

### Backend Tests
```bash
cd Backend-Test
npm install
npm test
```

## 🛡️ Security Features

- CORS middleware for cross-origin requests
- Request logging for audit trails
- Input validation ready (extendable)

## 🚦 Development Workflow

1. **Backend Changes**: Modify files in `BackEnd/` directory
2. **Frontend Changes**: Modify files in `MIM-DashBoard UI/` directory
3. **Testing**: Run backend tests before deployment
4. **Deployment**: Build frontend with `npm run build`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.
