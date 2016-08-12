module Support
  module APIv1
    class Tickets < Grape::API

      resource :tickets do

        desc 'Returns all tickets'
        params do
          optional :_filters, type: JSON, allow_blank: false
          optional :_sorts, type: JSON, allow_blank: false
        end
        get do
          tickets = Ticket.where(params[:_filters]).sort(params[:_sorts])

          { data: { items: tickets } }
        end

        desc 'Create a ticket'
        params do
          requires :title, type: String
          requires :content, type: String
          requires :author_id, type: String
          optional :author_meta, type: Hash
        end
        post do
          ticket = Ticket.create(title: params[:title], comments: [
            {
              author_id: params[:author_id],
              author_meta: params[:author_meta],
              content: params[:content]
            }
          ])

          { data: { items: [ ticket ] } }
        end

        desc 'Return a ticket'
        params do
          requires :id, type: String
        end
        route_param :id do
          before {
            @ticket = Ticket.find(params[:id])
          }

          get do
            { data: { items: [ @ticket ] } }
          end

          desc 'Reopen a ticket'
          put 'reopen' do
            @ticket.reopen!

            { data: { items: [ @ticket ] } }
          end

          desc 'Close a ticket'
          put 'close' do
            @ticket.close!

            { data: { items: [ @ticket ] } }
          end

          desc 'Set ticket comments as read'
          put 'read' do
            @ticket.read!

            { data: { items: [ @ticket ] } }
          end

          desc 'Add a comment to the ticket'
          params do
            requires :content, type: String
            requires :author_id, type: String
            optional :author_meta, type: Hash
          end
          post 'comment' do
            comment = Comment.new(author_id: params[:author_id], author_meta: params[:author_meta], content: params[:content])

            @ticket.state = 'pending'
            @ticket.comments.push(comment)
            @ticket.save

            { data: { items: [ @ticket ] } }
          end
        end

      end

    end
  end
end
