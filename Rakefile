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

  file_names.each do |file_name|
    # css
    text = File.read(file_name)
    File.open(file_name, 'w') do |f|
      content = text.gsub("main.css", args[:hash]+"-main.css")
      content = content.gsub("main.js", args[:hash]+"-main.min.js")
      f.write(content)
    end
  end
end
