
all: server

server: jekyll compass

drafts: jekylldrafts compass

jekyll:
	@jekyll serve --watch

jekylldrafts:
	@jekyll serve --watch --drafts

compass:
	@compass watch
