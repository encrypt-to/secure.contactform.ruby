require 'rubygems'
require 'bundler'
Bundler.require

set :root, File.dirname(__FILE__)

set :email_address, 'your@email.com'
set :email_username, ENV['SENDGRID_USERNAME']
set :email_password, ENV['SENDGRID_PASSWORD']
set :email_service, ENV['EMAIL_SERVICE']
set :email_domain, 'heroku.com'

get '/' do
  erb :contact
end

post '/contact' do
  require 'pony'
    Pony.mail(
      :from => params[:name] + " <" + params[:email] + ">",
      :to => settings.email_address,
      :subject => params[:name] + " has contacted you",
      :body => params[:message],
      :via => :smtp,
      :via_options => { 
        :address              => 'smtp.' + settings.email_service,
        :port                 => '587',
        :enable_starttls_auto => true,
        :user_name            => settings.email_username,
        :password             => settings.email_password,
        :authentication       => :plain,
        :domain               => settings.email_domain
      }
    )
  'Many thanks for your mail!'
end
