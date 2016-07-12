module Support
  module APIv1
    class Tickets < Grape::API

      resource :tickets do

        desc 'Returns all tickets'
        params do
          requires :_filters, type: JSON, allow_blank: false
          optional :_sort, type: JSON, allow_blank: false
        end
        get do
          Ticket.where(params[:_filters]).sort(params[:_sort])
        end

        desc 'Create a ticket'
        params do
          requires :title, type: String
          requires :content, type: String
          requires :author_id, type: String
          optional :author_meta, type: Hash
        end
        post do
          Ticket.create(title: params[:title], comments: [
            {
              author_id: params[:author_id],
              author_meta: params[:author_meta],
              content: params[:content]
            }
          ])
        end

        desc 'Return a ticket'
        params do
          requires :id, type: String
        end
        route_param :id do
          get do
            Ticket.find(params[:id])
          end

          desc 'Reopen a ticket'
          put 'reopen' do
            Ticket.find(params[:id]).reopen!
          end

          desc 'Close a ticket'
          put 'close' do
            Ticket.find(params[:id]).close!
          end

          desc 'Set ticket comments as read'
          put 'read' do
            Ticket.find(params[:id]).read!
          end

          desc 'Add a comment to the ticket'
          params do
            requires :content, type: String
            requires :author_id, type: String
            optional :author_meta, type: Hash
          end
          post 'comment' do
            comment = Comment.new(author_id: params[:author_id], author_meta: params[:author_meta], content: params[:content])

            ticket = Ticket.find(params[:id])
            ticket.state = 'pending'
            ticket.comments.push(comment)
            ticket.save
          end
        end

      end

    end
  end
end
