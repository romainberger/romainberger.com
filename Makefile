CHECK=\033[32m✔ Done\033[39m
HR=\033[37m--------------------------------------------------\033[39m
TIME=$$(date +'%Y%m%d%H%M%S')

all: build

server: compass python-server open

compass:
	compass watch

python-server:
	./server.py

open:
	@open "http://127.0.0.1:5000"

build: freeze minifyjs renamefiles copyfiles renameassets removefiles goodbye

freeze:
	@echo "\n${HR}"
	@echo "\033[36mFreezing...\033[39m"
	@python freeze.py
	@printf "\033[36mFreezing...\033[39m"
	@echo "                       ${CHECK}"

minifyjs:
	@echo "${HR}"
	@printf "\033[36mMinifying js...\033[39m"
	@uglifyjs build/static/js/main.js -o build/static/js/main.min.js
	@echo "                   ${CHECK}"

renamefiles:
	@echo "${HR}"
	@printf "\033[36mRenaming files...\033[39m"
	@mv build/about build/about.html
	@mv build/contact build/contact.html
	@mv build/music build/music.html
	@mv build/web build/web.html
	@echo "                 ${CHECK}"

copyfiles:
	@echo "${HR}"
	@printf "\033[36mCopying files...\033[39m"
	@cp files/.htaccess build/.htaccess
	@cp files/robot.txt build/robot.txt
	@echo "                  ${CHECK}"

renameassets:
	@echo "${HR}"
	@printf "\033[36mRenaming assets...\033[39m"
	@mv build/static/css/main.css build/static/css/${TIME}-main.css
	@mv build/static/js/main.min.js build/static/js/${TIME}-main.min.js
	@echo "                ${CHECK}"
	@echo "${HR}\n"
	@rake build["${TIME}"]

removefiles:
	@rm build/static/css/*.scss
	@rm build/static/js/main.js
	@rm -rf build/static/img/sprites

goodbye:
	@echo "\n\033[32m✔    Build successful\033[39m\n\n"

deploy:
	@echo ""
	@echo "Deploying motherfucker...    "
	@printf "Copying pages...    "
	@cp build/index.html ../index.html
	@cp build/about.html ../about.html
	@cp build/web.html ../web.html
	@cp build/contact.html ../contact.html
	@cp build/music.html ../music.html
	@echo "                   ✔ Done"
	@printf "Static files...    "
	@cp -r build/static ../static
	@echo "                    ✔ Done"
	@printf "Dotfiles...    "
	@cp build/.htaccess ../.htaccess
	@cp build/robot.txt ../robot.txt
	@cp build/humans.txt ../humans.txt
	@echo "                   ✔ Done"
	@echo ""
