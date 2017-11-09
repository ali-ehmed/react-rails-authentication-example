module Api
  module Users
    class SessionsController < Devise::SessionsController
      before_action :check_signed_in?, only: [:create]
      before_action :authenticate_user!, only: [:verify_authentication, :destroy]
      skip_before_action :verify_signed_out_user

      def verify_authentication; json! :ok end

      def destroy
        json! :ok, message: I18n.t('devise.sessions.signed_out')
      end

      private

        def check_signed_in?
          json! :forbidden, message: 'You are already signed in.' if user_signed_in?
        end
    end
  end
end