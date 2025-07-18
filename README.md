# preact-example-go-inertia

> [!NOTE]
>
> This is a starter example style repository. Basic knowledge of the tech used
> in the stack is a pre-requisite.

- [preact-example-go-inertia](#preact-example-go-inertia)
  - [Tech Stack](#tech-stack)
  - [Usage](#usage)
    - [Setup Instructions](#setup-instructions)
      - [Quick Reference](#quick-reference)
      - [Go Server](#go-server)
      - [Node.js](#nodejs)
      - [Running with verbose steps](#running-with-verbose-steps)
    - [Caveats](#caveats)



## Tech Stack

- **Go**: Powers the backend server and API.
- **Preact**: Provides a lightweight UI library for building fast and reactive
  interfaces.
- **Inertia.js**: Simplifies building single-page applications using classic
  server-side routing patterns.
- **Vite**: Bundling everything
- **TailwindCSS**: Keeping things fancy

## Usage

### Setup Instructions

Below are the instructions to set up and run the application.

#### Quick Reference 

```sh
go mod tidy # download go deps
pnpm i # download node deps 
air # run go and asset building in dev mode

# in another terminal 
pnpm dev # run the ssr server
```

#### Go Server

- Install dependencies:

```sh
go mod tidy
```

- Run the dev server using [air](https://github.com/air-verse/air)

```sh
air
```

- Build the backend for production with

```sh
go build -o server .
```

- Configure any environment variables needed for the backend.

#### Node.js

- Install dependencies:

```sh
pnpm install
```

- Run the ssr server in dev mode

```sh
pnpm dev
```

- For production / distributable version of the ssr and assets server 

```sh
pnpm build
```

#### Running with verbose steps

The setup depends on InertiaJS for SSR and mounting on the client. SSR requires a nodejs server to offload the SSR request. 

here's the sequence of steps required to run everything in non-dev mode

1. Build the JS and SSR assets (`pnpm build`)
2. Build the go binary (`go build -o server .`)
3. Copy the needed assets 
   1. The server binary (`server`)
   2. The nodejs and client deps (`package.json`, `bootstrap`, `public`)
4. Run the SSR server `pnpm start` 
5. Run the go server `./server` 


### Caveats

- Multiple commands to run the server and ssr, while I plan to add in a way to make it seamless and tie everything to golang as much as I can, the current setup does require running multiple terminals to get it all going. 

- Secondary server for SSR, it's neat what InertiaJS can do but having to run a secondary js server does add to the total memory used by app which might not be worth it based on your use case, we plan to make it better as we move forward 
