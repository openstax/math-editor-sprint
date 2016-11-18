

all: init run

init:
	docker build -t matheditorsprint_main .

run:
	docker run --rm -it -p 3000:3000 -v "$(shell pwd)/src:/source" matheditorsprint_main start --server --files '**/*.html,**/*.js,**/*.css'
