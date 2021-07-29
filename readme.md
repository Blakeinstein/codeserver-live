# Codesandbox using coder.com's Code-Server

This is a proof of concept, to demonstrate using code-server to deliver a code sandbox like experience.

## Todo
- Write backend code to sanction docker containers on the fly.
- Use [vscode-live](https://github.com/coderpair/vscode-live) to allow live collaboration.
- Enable a template api on the backend code, to dynamically use templates.
- Write more templates.

## Available Templates

- [React](https://github.com/Blakeinstein/codeserver-react-template)

### Creating a template.

#### Using vite

1. Follow the [guide for creating a vite app](https://vitejs.dev/guide/)
2. Create/Modify vite.config.js with the following additional configuration.

```js
import { defineConfig } from 'vite' // if no config was shipped with the template

// https://vitejs.dev/config/
export default defineConfig({
	// the config, if exists may contain some plugins... dont remove those
  server: {
    port: 8081,
    open: false,
    cors: {
      origin: '*'
    },
    hmr: {
      port: 8080,
      path: 'sockjs-node'
    }
  },
  base: "/proxy/8081/",
  fs: {
    strict: true,
  },
})
```

#### Using webpack
1. Create a webpack app
2. Change/Create a dev script in `package.json` to set up the following env vars.
```json
"scripts": {
	"dev": "PUBLIC_URL=/absproxy/3000 \
					WDS_SOCKET_PATH=$PUBLIC_URL/sockjs-node \
					BROWSER=none \
					npm run start",
	"start": "...webpack start command...",
	...
```

## Structure
```cpp
project
│   README.md
│   file001.txt    
│
└───Container  // Contains the dockerfile setup for codeserver
│   │   Dockerfile
│   │
│   └───Configs // Contains configs for the vscode environment 
│       │   config.yaml // contains no auth config for code-server
│       │   settings.json // contains the vscode config for the minimal look
│   
└───src
│   │   main.ts // frontend entry point
│
│		docker-compose.yml // one-off code-server setup for testing
│   ... // frontend code
```

## Usage

1. Clone this repository. (if you want to run the docker session on another machine clone it there as well.)
2. Run `sudo docker-compose up` to start the docker session.
3. Update the `.env` file with the ip for the machine running docker.
4. For the front end.
	```js
		npm i or yarn // install dependencies
		npm run dev or yarn dev // run the frontend server.
	```