require 'aasm'

class Ticket
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Timestamps::Updated
  include AASM

  embeds_many :comments, cascade_callbacks: true

  field :title, type: String

  field :comments_count, type: Integer, default: 0
  field :comments_read_count, type: Integer, default: 0

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
  index 'comments.author_id' => 1

  set_callback :save, :before, :cache_comments_count 
  set_callback :create, :before, :cache_comments_read_count 

  def cache_comments_count 
    self.comments_count = self.comments.length 
  end 

  def cache_comments_read_count 
    self.comments_read_count = self.comments_count
  end 

  def read!
    self.cache_comments_read_count
    self.save!
  end
end
