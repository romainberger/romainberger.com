
all: server

server: jekyll compass

jekyll:
	@jekyll serve --watch

compass:
	@compass watch
