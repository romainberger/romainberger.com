source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh
chruby ruby-3.1.3
ruby -v
open http://localhost:4000
bundle exec jekyll serve
