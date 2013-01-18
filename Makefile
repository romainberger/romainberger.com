all: freeze minimifyjs renamefiles copyfiles

freeze:
	python freeze.py

minimifyjs:
	uglifyjs -o build/static/js/main.min.js build/static/js/main.js

renamefiles:
	cd build && mv about about.html && mv contact contact.html && mv music music.html && mv web web.html && cd ..

copyfiles:
	cp files/.htaccess build/.htaccess && cp files/manifest.appcache build/manifest.appcache && cp files/robot.txt build/robot.txt

# givemethemd5:
