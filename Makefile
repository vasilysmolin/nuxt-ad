update-front:
	git pull
	docker-compose up -d --build front

update-nginx:
	git pull
	docker-compose up -d --build nginx

lint:
	npx eslint .

setup:
	yarn install --frozen-lockfile

lint-fix:
	npx eslint --fix .

lint-fix2:
	npx eslint --fix .
