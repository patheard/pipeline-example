docker exec -it gitlab-runner bash -c "
  gitlab-runner register --non-interactive \
    --name local-runner \
    --executor docker \
    --docker-image alpine:latest \
    --url https://gitlab.com \
    --registration-token GMyFpemFU7PzgNwjeMz5 \
    --docker-volumes builds:/builds \
    --docker-volumes cache:/cache \
    --docker-cap-add SYS_ADMIN \
"
