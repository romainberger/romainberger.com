
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
	@rm -rf ../static
	@cp -r build/static ../static
	@echo "                    ✔ Done"
	@printf "Dotfiles...    "
	@cp build/.htaccess ../.htaccess
	@cp build/robot.txt ../robot.txt
	@cp build/humans.txt ../humans.txt
	@echo "                   ✔ Done"
	@echo ""
