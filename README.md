# Azure MIM Dashboard

**Major Incident Management Dashboard** - A comprehensive web application for managing and tracking major incidents across enterprise applications. Built with React frontend and Node.js backend, deployed on Azure App Service.

## 🚀 Features

- **Real-time Incident Management**: Create, update, and track major incidents with P1/P2 priority classification
- **Interactive Dashboard**: Modern React-based UI with responsive design and real-time updates
- **RESTful API**: Node.js backend with Express framework and MongoDB integration
- **Azure Deployment**: Production-ready deployment on Azure App Service
- **Cross-platform Support**: CORS enabled for seamless frontend-backend integration
- **Comprehensive Testing**: Backend test suite with multiple test datasets
- **Production Build**: Optimized build output in wwwroot for Azure deployment

## 🏗️ Architecture

### Frontend (`MIM-DashBoard UI/`)
- **Framework**: React with Vite build tool
- **State Management**: MobX for reactive state management
- **Styling**: CSS modules and global styles
- **HTTP Client**: Axios for API communication
- **Build Output**: Production build in `wwwroot/` directory

### Backend (`BackEnd/`)
- **Runtime**: Node.js with Express.js framework
- **Architecture**: RESTful API with middleware pattern
- **Data Storage**: JSON file-based storage (incident.json)
- **CORS**: Enabled for cross-origin requests
- **Port**: Configured for Azure App Service

### Testing (`Backend-Test/`)
- **Test Framework**: Custom test suite
- **Test Data**: Multiple test datasets for different scenarios
- **Coverage**: Edge cases, large datasets, and priority-based incidents

## 📋 Prerequisites

- **Node.js**: v14 or higher
- **npm**: Comes with Node.js
- **Azure CLI**: For deployment (optional)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone [repository-url]
cd Azure-MIM-Dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Application (Common Entry Point)
```bash
npm start
# or
node server.js
```

The application will start on `http://localhost:3000` with:
- **Frontend**: Served from `wwwroot/` directory
- **Backend API**: Available at `/api` endpoint
- **Unified Server**: Single server.js file handles both frontend and backend

### 4. Alternative Development Setup
For separate development of frontend and backend:

**Backend Development:**
```bash
cd BackEnd
npm install
npm start
```

**Frontend Development:**
```bash
cd "MIM-DashBoard UI"
npm install
npm run dev
```

### 5. Production Build
```bash
cd "MIM-DashBoard UI"
npm run build
```
The production build will be generated in the `wwwroot/` directory.

## 📁 Project Structure

```
Azure-MIM-Dashboard/
├── BackEnd/                    # Node.js backend
│   ├── controllers/           # API controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # Data models
│   ├── routes/                # API routes
│   ├── Data/                  # JSON data files
│   │   └── incident.json      # Incident data storage
│   ├── log/                   # Log files
│   └── index.js              # Backend entry point
├── Backend-Test/              # Backend test suite
│   ├── test.js               # Main test file
│   └── Test-data/            # Test datasets
│       ├── test-incidents-edge-cases.json
│       ├── test-incidents-large-dataset.json
│       ├── test-incidents-mixed.json
│       ├── test-incidents-p1.json
│       └── test-incidents-p2.json
├── MIM-DashBoard UI/         # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/        # API services
│   │   └── stores/          # State management
│   ├── public/              # Static assets
│   └── package.json
├── wwwroot/                  # Production build output
│   ├── index.html
│   ├── assets/
│   └── oup.png
├── package.json              # Root package.json
├── server.js                # Main server file
├── .deployment             # Azure deployment configuration
├── .gitignore
├── 404.html                # Custom 404 page
└── README.md               # This file
```

## 🔌 API Endpoints

### Backend Base URL
```
https://[your-app-service].azurewebsites.net/incident
```

## 🧪 Testing

### Backend Tests
```bash
cd Backend-Test
npm install
npm test
```

### Test Datasets
- **Edge Cases**: Test boundary conditions and error handling
- **Large Dataset**: Performance testing with bulk data
- **Mixed Data**: Various incident types and priorities
- **P1/P2 Priority**: Priority-specific test cases

## 🚀 Azure Deployment

### Deployment Steps
1. **Azure App Service**: Deploy backend to Azure App Service
2. **Static Files**: Serve frontend from wwwroot directory
3. **Environment Variables**: Configure in Azure App Service settings
4. **Custom Domain**: Optional custom domain configuration

### Azure Configuration
- **Runtime Stack**: Node.js
- **Startup Command**: `node server.js`
- **Port**: Process.env.PORT (Azure sets this automatically)

## 🛡️ Security Features

- CORS middleware for cross-origin requests
- Request logging for audit trails
- Input validation ready (extendable)
- Azure App Service security features

## 🚦 Development Workflow

1. **Backend Changes**: Modify files in `BackEnd/` directory
2. **Frontend Changes**: Modify files in `MIM-DashBoard UI/` directory
3. **Testing**: Run backend tests before deployment
4. **Build**: Create production build with `npm run build`
5. **Deploy**: Deploy to Azure App Service

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

## 📞 Contact

- **Project**: Azure MIM Dashboard
- **Repository**: [GitHub Repository URL]
- **Issues**: [GitHub Issues URL]
