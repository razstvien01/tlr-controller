# Telepresence Robot Controller

The Telepresence Robot Controller is a comprehensive solution for controlling a telepresence robot remotely. It leverages Firebase for real-time communication, Flask as the backend server, and ReactJS for the frontend user interface.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Backend](#backend)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Real-time Communication:** Utilizes Firebase for seamless real-time communication between the robot and the user interface.
- **Remote Control:** Allows users to remotely control the telepresence robot using an intuitive and user-friendly frontend.
- **Responsive Interface:** The frontend, built with ReactJS, ensures a responsive and interactive user interface.

## Installation

Follow these steps to set up the Telepresence Robot Software:

1. Clone the repository: 
```bash
git clone https://github.com/razstvien01/tlr_controller.git
```
2. Navigate to the project directory: `cd telepresence-robot`
3. Install backend dependencies: `pip install -r requirements.txt`
4. Install frontend dependencies: `cd frontend && npm install`

## Usage

To run the Telepresence Robot Software, use the following commands:

1. Start the backend server (Flask): `python app.py`
2. Start the frontend application (ReactJS): `cd frontend && npm start`

Visit `http://localhost:3000` in your web browser to access the user interface.

## Backend

The backend of the Telepresence Robot Software is powered by Flask. It handles communication with the robot and ensures smooth data flow between the frontend and the robot hardware.

## Frontend

The frontend is built with ReactJS, providing an interactive and responsive user interface. It enables users to control the telepresence robot and view live video streams.

## Contributing

If you would like to contribute to the project, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the [Your License Name] - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

For questions or concerns, please contact [Your Name] at [your.email@example.com].
