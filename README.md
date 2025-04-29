# Dynamic Form Builder - Bajaj Finserv

A React TypeScript application that allows students to log in and fill out dynamic forms. Built with React, TypeScript, Material-UI, and Vite.

## Features

- User Registration and Login
- Dynamic Form Generation
- Multi-section Forms with Validation
- Modern and Responsive UI
- Form Progress Tracking
- Real-time Validation

## Tech Stack

- React
- TypeScript
- Material-UI
- React Hook Form
- Yup Validation
- Axios for API calls
- Vite for Build Tool

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd [your-repo-name]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Usage

1. Register as a new student or log in with existing credentials
2. Fill out the dynamic form sections
3. Navigate between sections using Previous/Next buttons
4. Submit the form when all sections are complete

## API Endpoints

The application uses the following API endpoints:

- POST `/create-user`: Register/Login user
- GET `/get-form`: Fetch dynamic form structure

## Project Structure

```
src/
  ├── components/        # React components
  ├── services/         # API services
  ├── types/           # TypeScript interfaces
  └── assets/          # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
