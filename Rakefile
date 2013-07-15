# encoding: UTF-8

require 'securerandom'
require 'fileutils'

hash = SecureRandom.uuid
check = "\033[32m✔ Done\033[39m"
hr = "\033[37m--------------------------------------------------\033[39m"

task :build do

  timeStart = Time.now

  # freeze
  puts hr
  puts "\033[36mFreezing...\033[39m"
  `python freeze.py`
  puts "                                  "+check

  # rename the files
  print "\033[36mRenaming files...\033[39m"
  files = [
    'build/about',
    'build/contact',
    'build/music',
    'build/web'
  ]
  files.each do |file|
    File.rename(file, file+'.html')
  end
  puts "                 "+check

  # minify js
  print "\033[36mMinifying js...\033[39m"
  `uglifyjs build/static/js/main.js -o build/static/js/main.js`
  puts "                   "+check

  # copy the files
  print "\033[36mCopying files...\033[39m"
  FileUtils.cp_r(Dir['files/*'], 'build')
  FileUtils.cp('files/.htaccess', 'build/.htaccess')
  puts "                  "+check

  # remove useless files
  Dir['build/static/css/*.scss'].each do |f|
    File.delete(f)
  end
  FileUtils.rm_rf('build/static/img/sprites')

  # rename the assets
  print "\033[36mRenaming assets...\033[39m"
  File.rename('build/static/css/main.css', 'build/static/css/'+hash+'-main.css')
  File.rename('build/static/js/main.js', 'build/static/js/'+hash+'-main.js')
  puts "                "+check

  # replace the assets file path with new names
  print "\033[36mReplace filenames...\033[39m"
  file_names = [
    'build/index.html',
    'build/about.html',
    'build/contact.html',
    'build/music.html',
    'build/web.html'
  ]

  # add hash to css and js filenames
  file_names.each do |file_name|
    text = File.read(file_name)
    File.open(file_name, 'w') do |f|
      content = text.gsub("main.css", hash+"-main.css")
      content = content.gsub("main.js", hash+"-main.js")
      f.write(content)
    end
  end

  # add comment at beginning of js
  jsfile = 'build/static/js/'+hash+'-main.js'
  text = File.read(jsfile)
  File.open(jsfile, 'w') do |f|
    content = "/*! romainberger.com */\n"+text
    f.write(content)
  end
  puts "              "+check

  timeEnd = Time.now

  puts "\n"+hr
  print "\033[36mBuild time: "
  print timeEnd - timeStart
  puts "s\033[39m"
  puts "Build successfull                 "+check
  puts hr+"\n\n"

end
