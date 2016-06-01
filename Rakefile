# Encoding: UTF-8

require 'securerandom'
require 'fileutils'

hash = SecureRandom.uuid
check = "\033[32m✔ Done\033[39m"
hr = "\033[37m--------------------------------------------------\033[39m"

task :default => :server

pids = []

desc "Run Jekyll server"
task :jekyll do
  pids << spawn('jekyll serve --watch')
end

desc "Run Jekyll server with drafts"
task :jekylldrafts do
  pids << spawn('jekyll serve --watch --drafts')
end

task :compass do
  pids << spawn('compass watch')
end

desc "Run Jekyll server and compass"
multitask :server => [:jekyll, :compass] do
  begin
    pids.each do |pid|
      Process.waitpid(pid)
    end
  rescue
    pids.each do |pid|
      Process.kill("TERM", pid)
    end
    exit
  end
end

desc "Run Jekyll server with drafts and compass"
multitask :drafts => [:jekylldrafts, :compass] do
  begin
    pids.each do |pid|
      Process.waitpid(pid)
    end
  rescue
    pids.each do |pid|
      Process.kill("TERM", pid)
    end
    exit
  end
end

task :jshint do
  puts 'Running Jshint'
  system "jshint js/main.js"
end

task :build do

  timeStart = Time.now

  puts "\n#{hr}\nBuilding site"

  FileUtils.rm_rf('_build')

  `jekyll build`

  # minify js
  system "./node_modules/.bin/uglifyjs _site/js/main.js _site/js/vendors/prism.js -o _site/js/main.min.js"

  # rename files
  File.rename('_site/js/main.min.js', "_site/js/#{hash}-main.js")
  File.rename('_site/css/main.css', "_site/css/#{hash}-main.css")

  # remove useless files
  files = [
    'js/main.js',
    'js/vendors/prism.js',
  ]
  files.each do |f|
    File.delete("_site/#{f}")
  end

  files = [
    '_site/index.html',
    '_site/about/index.html',
    '_site/contact/index.html',
    '_site/music/index.html',
    '_site/gear-list/index.html'
  ]
  files.concat(Dir['_site/20**/**/*.html'])
  files.each do |file_name|
    text = File.read(file_name)

    File.open(file_name, 'w') do |f|
      content = text.gsub('main.js', "#{hash}-main.js")
      content = content.gsub('main.css', "#{hash}-main.css")
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
  puts "Build successfull                 #{check}"
  puts "#{hr}\n\n"

end

desc 'Create a new post'
task :post do
  post_name = ARGV[1]

  unless post_name
    puts "\033[31mMissing argument: post name\033[39m"
    puts "Usage: $ rake post 'Post Name'"
    next
  end

  puts "\n#{hr}\nCreating post \"#{post_name}\""

  # filename
  filename = post_name.downcase
  filename = filename.gsub(' ', '-')
  date = Time.now.strftime("%Y-%m-%d")
  date_time = Time.now.strftime("%Y-%m-%d %H:%M:%S")
  image = "#{filename}.png"
  filename = "#{date}-#{filename}.markdown"

  # create file with basic content
  content = "---\n"
  content = "#{content}layout: post\n"
  content = "#{content}title: #{post_name}\n"
  content = "#{content}date: #{date_time}\n\n"
  content = "#{content}image: #{image}\n"
  content = "#{content}background-color: '#000'\n"
  content = "#{content}image-class: center dark\n---\n"

  File.open('_posts/'+filename, 'w') do |f|
    f.write(content)
  end

  puts "Done              #{check}"
  puts "#{hr}\n\n"

  task post_name.to_sym do ; end

end
