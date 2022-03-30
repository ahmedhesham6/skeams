FROM ruby:2.7.1

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /app

WORKDIR /app 

ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock

RUN gem install nokogiri --platform=ruby
RUN bundle install
RUN bundle config set force_ruby_platform true

ADD . /app