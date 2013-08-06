# Encoding: UTF-8

require 'securerandom'
require 'fileutils'

hash = SecureRandom.uuid
check = "\033[32m✔ Done\033[39m"
hr = "\033[37m--------------------------------------------------\033[39m"

task :build do

  timeStart = Time.now

  puts "\n#{hr}\nBuilding site"

  `jekyll build`

  # minify js
  system "uglifyjs _site/js/main.js _site/js/vendors/prism.js -o _site/js/main.min.js"

  # rename files
  File.rename('_site/js/main.min.js', "_site/js/#{hash}-main.js")
  File.rename('_site/css/main.css', "_site/css/#{hash}-main.css")

  # remove useless files
  files = ['_site/js/main.js', '_site/js/vendors/prism.js']
  files.each do |f|
    File.delete(f)
  end

  # replace file names
  files = Dir['_site/**/**/*.html']
  files << '_site/index.html'
  files.each do |file_name|
    text = File.read(file_name)

    File.open(file_name, 'w') do |f|
      content = text.gsub('main.js', hash+'-main.js')
      content = text.gsub('main.css', hash+'-main.css')
      content = content.gsub('<script src="/js/vendors/prism.js"></script>', '')
      f.write(content)
    end
  end

  # Move everything to a different directory to avoid overriding everything
  FileUtils.cp_r('_site', '_build')

  timeEnd = Time.now

  print "\033[36mBuild time: "
  print timeEnd - timeStart
  puts "s\033[39m"
  puts "Build successfull                 "+check
  puts hr+"\n\n"

end

task :jshint do
  system "jshint js/main.js"
end
