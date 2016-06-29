require 'aasm'

class Ticket
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Timestamps::Updated
  include AASM

  embeds_many :comments, cascade_callbacks: true

  field :title, type: String
  field :readed_count, type: Integer, default: 0

  field :state, type: String

  aasm :column => :state do
    state :new, :initial => true
    state :pending
    state :closed

    event :close do
      transitions :from => [:new, :pending], :to => :closed
    end

    event :reopen do
      transitions :from => :closed, :to => :pending
    end
  end

  index 'state' => 1
  index 'comments.user_id' => 1
end
