FROM golang:1.24-alpine AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o server .


FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm i -g corepack@latest; corepack pnpm install

COPY . .
RUN pnpm build

COPY --from=builder /app/server /usr/local/bin/app-server
RUN chmod +x /usr/local/bin/app-server

EXPOSE 3000
ENV PORT=3000
ENV HOST="0.0.0.0"


CMD ["./scripts/docker.sh"]