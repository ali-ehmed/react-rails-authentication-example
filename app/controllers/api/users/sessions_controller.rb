module Api
  module Users
    class SessionsController < Devise::SessionsController
      before_action :check_signed_in?, only: [:create]
      before_action :authenticate_user!, only: [:destroy]
      skip_before_action :verify_signed_out_user, only: [:destroy]

      def create
        self.resource = warden.authenticate!(auth_options)
        sign_in(resource_name, resource)
        json! :ok
      end

      def destroy
        (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
        json! :ok
      end

      private

        def check_signed_in?
          if user_signed_in?
            json! :forbidden, message: 'You are already signed in.'
          end
        end
    end
  end
end