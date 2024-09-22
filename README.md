# Firebot Custom WebSocket Connection

This project provides a custom WebSocket connection script for Firebot, implemented in TypeScript.

## Features

- Create and manage custom WebSocket connections
- Send and receive messages through WebSocket connections
- Integration with Firebot's event system

## Installation

1. Clone this repository or use it as a template for a new project
2. Run `npm install` to install dependencies

## Development

To build the project in development mode:

1. Run `npm run build:dev`
   - This automatically compiles the TypeScript code and copies the resulting JavaScript file to Firebot's scripts folder

## Creating a Release

To build a release:

1. Run `npm run build`
2. Copy the generated .js file from the `/dist` directory

## Important Notes

- Keep the script definition object (containing the `run`, `getScriptManifest`, and `getDefaultParameters` functions) in the `main.ts` file
- The output filename of the script can be customized by modifying the `"scriptOutputName"` property in the `package.json` file

## Usage

After integrating the script into Firebot, it enables handling custom WebSocket connections and processing messages within Firebot's event system.

## Contributing

Contributions are welcome! Please submit a Pull Request with your modifications.

## License

This project is open-source. Please check the repository for license details.
