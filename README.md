# Sh*t I Don't Know
This is a web application built with Next.js and React that scans a given subnet for active IP addresses and queries the local DNS for the corresponding hostnames.

## Installation
To install and run this application locally, follow these steps:

Clone this repository to your local machine.
Navigate to the root directory of the project.
Install the dependencies using `npm install`.
Start the development server using `npm run dev`.
The application should now be running at http://localhost:3000.

## Usage
To use the application, follow these steps:

Enter an IP address and select a subnet mask from the fields provided.
Click the "Ping" button to start the scanning process.
The results will be displayed in a table showing the IP address, hostname (if available), and response time.
## Dependencies
This application relies on the following dependencies:

* **NextJS**: Used for the backend API.
* **React**: Used for the frontend user interface.
* **Material-UI**: Used for styling the user interface.
* **net-ping**: Used for performing asynchronous pings.
* **dns**: Used for performing reverse lookups.
* **axios**: Used for consuming REST calls.
* **ip**: Used for generating IP addresses from CIDR notation.

## Contributing
Contributions are welcome! If you would like to contribute to this project, please follow these guidelines:

Fork the repository.
Make your changes.
Submit a pull request with a clear description of your changes.
