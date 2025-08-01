# MIM-Dashboard

MI Handler - Major Incident Handling: A UI which helps teams to define the process of handling major incidents for application teams across the enterprise. Features include creating dedicated triage channels and bridges to discuss issues and their mitigation, triggering PagerDuty or emails to involve the team based on application selection.

## Project Structure

- **FrontEnd**: React based frontend application.
- **BackEnd**: Node.js backend server handling incident management logic.

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

## FrontEnd Setup

1. Navigate to the `FrontEnd` directory:
   ```bash
   cd FrontEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to the URL shown in the terminal (usually `http://localhost:3000`).

The frontend currently hosts a simple welcome page displaying "Welcome to MIM".

## BackEnd Setup

1. Navigate to the `BackEnd` directory:
   ```bash
   cd BackEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```
   or if a start script is defined:
   ```bash
   npm start
   ```

## Usage

- Use the frontend to interact with the major incident management UI.
- The backend handles incident data and notifications.

## Contributing

Contributions are welcome. Please open issues or pull requests for improvements or bug fixes.

## License

Specify your project license here.
