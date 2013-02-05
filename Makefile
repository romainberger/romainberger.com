all: freeze minimifyjs renamefiles copyfiles renameassets

freeze:
	python freeze.py

minimifyjs:
	uglifyjs -o build/static/js/main.min.js build/static/js/main.js

renamefiles:
	cd build &&\
	mv about about.html &&\
	mv contact contact.html &&\
	mv music music.html &&\
	mv web web.html &&\
	cd ..

copyfiles:
	cp files/.htaccess build/.htaccess &&\
	cp files/manifest.appcache build/manifest.appcache &&\
	cp files/robot.txt build/robot.txt

renameassets:
	time=$$(date +'%Y%m%d-%H%M%S') && \
	mv build/static/css/main.css build/static/css/$$time-main.css &&\
	mv build/static/js/main.min.js build/static/js/$$time-main.min.js &&\
	echo "Hash: "$$time