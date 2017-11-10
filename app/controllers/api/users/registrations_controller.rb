module Api
  module Users
    class RegistrationsController < Devise::RegistrationsController
      def create
        build_resource(sign_up_params)
        resource.save

        if resource.persisted?
          if resource.active_for_authentication?
            sign_up(resource_name, resource)
            json! :ok, user: resource
          else
            json! :ok, user: resource.errors.full_messages
          end
        else
          clean_up_passwords resource
          set_minimum_password_length
          json! :forbidden, user: resource, errors: content_tag(:ul, resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join.html_safe)
        end
      end

      private

      def sign_up_params
        params.require(:user).permit(:email, :password, :password_confirmation, :full_name)
      end
    end
  end
end