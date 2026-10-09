.PHONY: setup doctor dev build

setup:
	bash scripts/bootstrap.sh

doctor:
	npm run doctor

dev:
	npm run dev

build:
	npm run build
