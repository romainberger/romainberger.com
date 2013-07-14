# Rakefile only to replace the assets files name
# @todo: move everything from the Makefile here

task :build, :hash do |t, args|
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
      content = text.gsub("main.css", args[:hash]+"-main.css")
      content = content.gsub("main.js", args[:hash]+"-main.min.js")
      f.write(content)
    end
  end

  # add comment at beginning of js
  jsfile = 'build/static/js/'+args[:hash]+'-main.min.js'
  text = File.read(jsfile)
  File.open(jsfile, 'w') do |f|
    content = "/*! romainberger.com */\n"+text
    f.write(content)
  end
end
