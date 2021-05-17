FROM golang
WORKDIR /
COPY . .
RUN go mod download
EXPOSE 9092
CMD ["go", "run", "consumer.go"]