# Simple Jekyll plugin to generate GitHub buttons
# not very usefull, just a first attempt at writing a Jekyll plugin

module Jekyll

  class GithubButton < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super

      if /(?<type>\w+)\s+(?<username>\S+)\s+(?<repo>\S+)\s+(?<count>\w+)?/ =~ text
        @type = type
        @username = username
        @repo = repo
        @count = (count == 'false') ? false : true
      end

      @text = text
    end

    def render(context)
      url = "http://ghbtns.com/github-btn.html?user=#{@username}&repo=#{@repo}&type=#{@type}&count=#{@count}"
      "<iframe src=\"#{url}\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\"></iframe>"
    end
  end

end

Liquid::Template.register_tag('ghbtns', Jekyll::GithubButton)
