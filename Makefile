include include.mk

# Build the Docker image
build:
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

# Run the container in detached mode
run:
	docker run -d -p 3000:80 --name $(CONTAINER_NAME) $(DOCKER_IMAGE):$(DOCKER_TAG)

# Stop and remove the container
stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

# Clean up Docker images
clean:
	docker rmi $(DOCKER_IMAGE):$(DOCKER_TAG)

# Rebuild and rerun the container
rebuild: stop build run
