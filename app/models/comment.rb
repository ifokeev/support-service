class Comment
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic 

  embedded_in :ticket

  field :user_id, type: String
  field :content

  validates_presence_of :user_id, :content
end
