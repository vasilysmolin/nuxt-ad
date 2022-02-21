update-front:
	git pull
	docker-compose up -d --build front

update-nginx:
	git pull
	docker-compose up -d --build nginx
