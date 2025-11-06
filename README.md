# 3D Political Spectrum Visualizer

An interactive 3D visualization of political ideologies. Explore different viewpoints by rotating the cube and click on points to get an AI-generated summary of each ideology. You can also answer a questionnaire to plot your own position on the spectrum.

![Screenshot of the 3D Political Spectrum Visualizer](./screenshot.png) 

## Features

- **Interactive 3D Cube:** A three-axis model representing different political dimensions.
  - **X-Axis:** Economic (Left to Right)
  - **Y-Axis:** Authority (Libertarian to Authoritarian)
  - **Z-Axis:** Cultural (Traditionalist to Progressive)
- **Ideology Spheres:** Clickable points representing various political ideologies.
- **AI-Powered Summaries:** Uses the Google Gemini API to generate concise, neutral descriptions of each selected ideology.
- **Plot Yourself:** Take a comprehensive questionnaire to calculate and display your own position on the political spectrum.
- **Responsive Design:** Works on both desktop and mobile devices.
- **Screenshot Functionality:** Capture and download the current view of the political cube.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **3D Rendering:** Three.js with @react-three/fiber and @react-three/drei
- **AI Integration:** Google Gemini API (`@google/genai`)

## Project Setup

This project is built as a modern, single-page application without a traditional bundler setup. It uses ES modules and an `importmap` in `index.html` to handle dependencies.

### Prerequisites

1.  A modern web browser that supports ES modules and import maps (e.g., Chrome, Firefox, Edge).
2.  A Google Gemini API Key.

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/3d-political-spectrum.git
    cd 3d-political-spectrum
    ```

2.  **Set up your API Key:**
    This application requires a Google Gemini API key to function. It expects the key to be available as an environment variable named `API_KEY`. When running locally or deploying, you must ensure this variable is set in the execution environment. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

3.  **Serve the application:**
    Since this project relies on ES modules, you need to serve the files from a local web server. You cannot simply open `index.html` from the file system. A simple way to do this is using `npx`:

    ```bash
    npx serve .
    ```
    This will start a server, and you can access the application at the URL provided (usually `http://localhost:3000`).

## File Structure

```
.
├── components/           # React components for the application
│   ├── Header.tsx
│   ├── IdeologyTooltip.tsx
│   ├── Loader.tsx
│   ├── PoliticalCube.tsx
│   └── Questionnaire.tsx
├── services/             # Services for external APIs (e.g., Gemini)
│   └── geminiService.ts
├── App.tsx               # Main application component
├── constants.ts          # Constants and static data for ideologies
├── index.html            # Entry point of the application
├── index.tsx             # React root renderer
├── metadata.json         # Application metadata
├── questionnaireData.ts  # Questions for the questionnaire
├── README.md             # This file
└── types.ts              # TypeScript type definitions
```

## How It Works

The application maps political ideologies to a 3D coordinate system. Each ideology's position is defined in `constants.ts`. When a user clicks on an ideology sphere, a request is sent to the Google Gemini API via `geminiService.ts` to fetch a neutral description.

The questionnaire in `questionnaireData.ts` calculates the user's position by scoring their answers and normalizing them to a `[-1, 1]` range for each axis, which is then plotted on the cube.
