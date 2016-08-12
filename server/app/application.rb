require 'grape'
require 'mongoid'
require 'aasm'

Dir["#{File.dirname(__FILE__)}/models/**/*.rb"].each { |f| require f }
Dir["#{File.dirname(__FILE__)}/api/**/*.rb"].each { |f| require f }

Mongoid.load! File.expand_path('config/mongoid.yml', File.dirname(__FILE__))

module JSendErrorFormatter
  def self.call message, backtrace, options, env
    p backtrace
    { error: { code: backtrace, message: message } }.to_json
  end
end

module Support
  class API < Grape::API
    error_formatter :json, JSendErrorFormatter

    format :json
    prefix :api

    rescue_from Mongoid::Errors::DocumentNotFound do |e|
      error! 'Not found', 404
    end

    rescue_from AASM::InvalidTransition do |e|
      error! 'Invalid transition', 403
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
