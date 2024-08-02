# Freight Forwarder App - B2B2C Notification Usecases

Welcome to the Freight Forwarder App! This application serves as a logistics solution for shipping packages worldwide. It includes a user-friendly interface for managing shipments and an authentication system for shipping companies and end-users. You can implement an app inbox in Next.js application by checking out this [guide](https://www.suprsend.com/post/implementing-app-inbox-in-next-js-application-as-a-developer)

## Live Demo

Check out the live demo of the application [here](https://b2b2c-freight-company.vercel.app/).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication:** Login form with fields for company name, end-user name, company email, and end-user email.
- **Shipment Management:** Add and list shipments, with details like tracking ID, company, destination, weight, and status.
- **Copy to Clipboard:** Easily copy tracking IDs to clipboard.
- **Responsive Design:** Optimized for both desktop and mobile views.

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/SuprSend-NotificationAPI/b2b2c-freight_company.git
   cd b2b2c-freight_company
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root of your project and add your MongoDB connection string:

   ```env
   MONGODB_URI=your-mongodb-connection-string
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Authentication

1. Go to the [home page](https://b2b2c-freight-company.vercel.app/).
2. Fill in the login form with the required details and click "Login".
3. On successful login, you will be redirected to the dashboard.

### Managing Shipments

1. On the dashboard page, fill in the form to add a new shipment.
2. The shipment details will be displayed in the table on the right side.

## Project Structure

- `src/app/page.tsx`: Home page with the login form.
- `src/app/dashboard/page.tsx`: Dashboard page with shipment management functionality.
- `src/app/api/login/route.ts`: API route for handling login requests.
- `src/app/api/shipments/route.ts`: API route for managing shipments.
- `src/lib/dbConnect.ts`: MongoDB connection utility.

## API Endpoints

### Login

- **POST** `/api/login`

  Request Body:
  ```json
  {
    "companyName": "string",
    "endUserName": "string",
    "companyEmail": "string",
    "endUserEmail": "string"
  }
  ```

  Response:
  - 200: Login successful
  - 400: All fields are required
  - 500: Internal server error

### Shipments

- **POST** `/api/shipments`

  Request Body:
  ```json
  {
    "company": "string",
    "destination": "string",
    "weight": "number"
  }
  ```

  Response:
  - 200: Shipment added successfully
  - 400: Validation error
  - 500: Internal server error

- **GET** `/api/shipments`

  Response:
  - 200: List of shipments
  - 500: Internal server error

## Technologies Used

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Icons:** Font Awesome
- **Database:** MongoDB
- **Deployment:** Vercel

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
