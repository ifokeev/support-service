class Comment
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic 

  embedded_in :ticket

  field :author_id, type: String
  field :content

  validates_presence_of :author_id, :content
end
