CHECK=\033[32m✔ Done\033[39m
HR=\033[37m--------------------------------------------------\033[39m

all: freeze minifyjs renamefiles copyfiles renameassets

freeze:
	@echo "${HR}"
	@echo "\033[36mFreezing...\033[39m"
	@python freeze.py
	@printf "\033[36mFreezing...\033[39m"
	@echo "                   ${CHECK}"

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
	@echo "                   ${CHECK}"

copyfiles:
	@echo "${HR}"
	@printf "\033[36mCopying files...\033[39m"
	@cp files/.htaccess build/.htaccess
	@cp files/robot.txt build/robot.txt
	@echo "                   ${CHECK}"

renameassets:
	@echo "${HR}"
	@printf "\033[36mRenaming assets...\033[39m"
	@time=$$(date +'%Y%m%d-%H%M%S')
	@mv build/static/css/main.css build/static/css/$$time-main.css
	@mv build/static/js/main.min.js build/static/js/$$time-main.min.js
	@echo "                   ${CHECK}"
	@echo "Hash: "$$time

deploy:
	# that's dirty
	@printf "Moving files...    "
	@mv build/index.html ../index.html
	@mv build/about.html ../about.html
	@mv build/web.html ../web.html
	@mv build/contact.html ../contact.html
	@echo "ok"
	@printf "Static files...    "
	@rm -rf ../static
	@mv build/static ../static
	@echo "ok"
