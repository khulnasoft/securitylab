docker-compose -f ../docker-compose.yml up -d secgate-artifacts
docker create -ti --name secgate-artifacts secgate-builder bash
docker cp secgate-artifacts:/app/release ./artifacts
docker rm -f secgate-artifacts
