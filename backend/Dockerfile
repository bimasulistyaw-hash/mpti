# Development stage with hot-reload support using Air
FROM golang:1.23-alpine AS dev

WORKDIR /app

# Install git, curl, and Air for hot reloading
RUN apk add --no-cache git curl build-base && \
    go install github.com/air-verse/air@latest

COPY go.mod go.sum* ./
RUN go mod download || true

COPY . .

EXPOSE 8080

CMD ["air", "-c", ".air.toml"]

# -----------------------------------------------------------------------------
# Production multi-stage build
# -----------------------------------------------------------------------------
FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download || true
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o main cmd/api/main.go

FROM alpine:3.20 AS prod
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
