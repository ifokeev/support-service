require_relative 'v1/tickets'

module Support
  module APIv1
    class Base < Grape::API
      version 'v1', using: :path

      mount Tickets
    end
  end
end
