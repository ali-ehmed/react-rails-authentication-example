module Api
  module Users
    class RegistrationsController < Devise::RegistrationsController
      def create
        build_resource(user_params)
        resource.save

        if resource.persisted?
          if resource.active_for_authentication?
            sign_up(resource_name, resource)
            json! :ok, user: resource
          else
            json! :ok, user: resource.errors.full_messages
          end
        else
          set_minimum_password_length
          json! :forbidden, user: resource, errors: content_tag(:ul, resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join.html_safe)
        end
      end

      def update
        self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
        resource_updated = update_resource(resource, user_params)

        if resource_updated
          bypass_sign_in resource, scope: resource_name
          json! :ok, user: resource
        else
          set_minimum_password_length
          json! :forbidden, user: resource, errors: content_tag(:ul, resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join.html_safe)
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :username, :current_password, :password, :password_confirmation, :full_name)
      end
    end
  end
end