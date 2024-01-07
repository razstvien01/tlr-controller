# Telepresence Robot Controller

The Telepresence Robot Controller is a comprehensive solution for controlling a telepresence robot remotely. It leverages Firebase for real-time communication, Flask as the backend server, and ReactJS for the frontend user interface.

## Table of Contents

- [Features](#features)
- [TechStack](#techstack)
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


## TechStack

**Client:** Reactjs, TailwindCSS

**Server:** Flask

**Database:** Firebase

## Installation

Follow these steps to set up the Telepresence Robot Software:

1. Clone the repository: `https://github.com/razstvien01/tlr_controller.git`
```bash
git clone https://github.com/razstvien01/tlr_controller.git
```
2. Navigate to the project directory: `tlr_controller/web`
```bash
cd tlr_controller/web
```
3. Install backend dependencies: make sure that you created a virtual environment in your server directory.

```bash
cd server
pip install -r requirements.txt
```

4. Install frontend dependencies:

```bash
cd client
yarn install
```

## Usage

To run the Telepresence Robot Software, use the following commands:

1. Start the backend server (Flask): `python server.py`
2. Start the frontend application (ReactJS): `yarn dev`

Visit `http://localhost:5173` in your web browser to access the user interface.

## Backend

The backend of the Telepresence Robot Software is powered by Flask. It handles communication with the robot and ensures smooth data flow between the frontend and the robot hardware.

## Frontend

The frontend is built with ReactJS, providing an interactive and responsive user interface. It enables users to control the navigations telepresence robot and view live video streams.
