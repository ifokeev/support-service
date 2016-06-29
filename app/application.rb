require 'grape'
require 'mongoid'
require 'aasm'

Dir["#{File.dirname(__FILE__)}/models/**/*.rb"].each { |f| require f }
Dir["#{File.dirname(__FILE__)}/api/**/*.rb"].each { |f| require f }

Mongoid.load! File.expand_path('config/mongoid.yml', File.dirname(__FILE__))

module Support
  class API < Grape::API
    class Grape::Middleware::Error
      def error_message(code, text)
	{ :error => { :code => code, :message => text } }.to_json
      end
    end

    format :json
    prefix :api

    rescue_from Mongoid::Errors::DocumentNotFound do |e|
      rack_response(error_message(404, 'Not found'), 404)
    end

    rescue_from AASM::InvalidTransition do |e|
      rack_response(error_message(403, 'Invalid transition'), 403)
    end
 
    desc 'Just test the API'
    get :status do
      { status: 'ok' }
    end

    mount Support::APIv1::Base
  end
end

APP = Rack::Builder.new {
  map "/" do
    run Support::API
  end
}
