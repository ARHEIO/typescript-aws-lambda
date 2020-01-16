docker run --rm \
  -e DOCKER_LAMBDA_STAY_OPEN=1 \
  -p 9001:9001 \
  -v "/Users/adameggleston/dev/personal/api/book-reviewer-api/dist/":/var/task:ro,delegated \
  lambci/lambda:nodejs12.x \
  getBooks.handler
