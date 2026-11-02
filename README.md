# Msarifi – Personal Expense Tracker

**Msarifi** is an Arabic personal expense tracking mobile application built with **Ionic, Angular, and Capacitor**.

The application helps users record, organize, and monitor their personal expenses through a simple interface. It provides a dashboard for monthly spending, expense history, customizable categories, and basic application settings.

## Features

### 1. Dashboard
- View total expenses for the current month.
- Display the number of recorded transactions.
- View recent expenses.
- Get a quick overview of personal spending.

### 2. Expense Management
- Add new expenses.
- Specify the amount, date, category, and notes.
- View the expense history.
- Search and organize expense records.
- Edit existing expenses.
- Delete expenses.

### 3. Category Management
- Create custom expense categories.
- Edit category information.
- Delete categories.
- Customize categories with icons and colors.

### 4. Application Settings
- Change the application password.
- Export expense data in JSON format.
- Clear stored expense records.

## Technology Stack

| Technology | Purpose |
|---|---|
| Angular 20 | Application framework |
| Ionic 8 | Mobile UI components and navigation |
| Capacitor 8 | Native mobile platform integration |
| TypeScript 5.9 | Application development |
| RxJS 7.8 | Reactive programming |
| SCSS | Styling and responsive layouts |
| Ionicons 7 | Icons and visual elements |

## Application Architecture

The application follows an Angular-based structure, separating pages, reusable components, and application services.

Data is managed locally using browser storage (`localStorage`), allowing the application to retain expense records and settings on the device.

The current implementation does not require a remote backend or database.

## Project Structure

```text
Msarifi/
│
├── android/
│   └── Android native project
│
├── assets/
│   └── Application assets
│
├── src/
│   ├── app/
│   │   ├── Pages/
│   │   │   ├── Home
│   │   │   ├── Add Expense
│   │   │   ├── History
│   │   │   ├── Categories
│   │   │   └── Settings
│   │   │
│   │   ├── Components/
│   │   ├── Services/
│   │   └── Application modules and configuration
│   │
│   ├── assets/
│   ├── theme/
│   └── index.html
│
├── capacitor.config.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

*The structure above is a simplified overview of the main project areas.*

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Ionic CLI
- Android Studio (for Android development)

### Installation

Clone the repository:

```bash
git clone https://github.com/mosaabudosh/Msarifi.git
```

Navigate to the project directory:

```bash
cd Msarifi
```

Install dependencies:

```bash
npm install
```

### Run the Application

Start the Ionic development server:

```bash
ionic serve
```

The application will be available in your browser through the local development server.

### Android Development

The project includes an Android platform configured through Capacitor.

After installing the dependencies, synchronize the web application with the Android project:

```bash
npx cap sync android
```

Open the Android project in Android Studio:

```bash
npx cap open android
```

## Data Storage

Msarifi currently uses local device/browser storage through `localStorage`.

This means:

- Expense records are stored locally.
- Categories and application settings are stored locally.
- No remote database or cloud synchronization is included in the current implementation.
- Exporting data is available through JSON format.

## Current Scope and Limitations

The current version focuses on personal expense recording and local data management.

It does not currently include:

- Backend API integration.
- Cloud data synchronization.
- Multi-device account synchronization.
- Online user authentication.
- A centralized financial database.

**Security note:** The current password functionality is a basic local application lock, not a secure authentication system. Sensitive financial information should not be considered protected by enterprise-grade security in this implementation.

## Future Improvements

Potential enhancements for future versions include:

- Backend API and database integration.
- Secure authentication and user accounts.
- Cloud backup and data synchronization.
- JSON data import and restoration.
- Expense analytics and visual reports.
- Monthly budgets and spending limits.
- Improved data protection.

## Project Repository

GitHub: https://github.com/mosaabudosh/Msarifi

## Author

**Mosa Abudosh**

Software Engineer | Software Developer | Full Stack .NET & Angular

- GitHub: [mosaabudosh](https://github.com/mosaabudosh)
- LinkedIn: [Mosa Abudosh](https://www.linkedin.com/in/mosa-a-abudosh/)
