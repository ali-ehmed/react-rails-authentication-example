module Authenticable
  extend ActiveSupport::Concern

  included do
    helper_method :user_signed_in?, :current_user

    before_action do
      if devise_controller?
        self.class.clear_respond_to
        self.class.respond_to :json
      end
    end
  end

  protected

    def authenticate_user!(opts = {})
      unless user_id_in_token?
        json! :unauthorized, message: 'Your session is expired. Please sign in again.' and return
      end

      @current_user = User.find_by!(id: auth_token['user_id'], jti: auth_token['jti'])
    rescue ActiveRecord::RecordNotFound, JWT::VerificationError, JWT::DecodeError
      json! :unauthorized, message: 'Your session is expired. Please sign in again.' and return
    end

    def current_user
      @current_user ||= User.find(auth_token['user_id']) if user_id_in_token?
    end

    def user_signed_in?
      current_user.present?
    end

  private

    def http_token
      @http_token ||= request.headers['Authorization'].try(:split, ' ').try(:last)
    end

    def auth_token
      @auth_token ||= JWT.decode(http_token, Rails.application.secrets.jwt_secret).try(:first)
    rescue JWT::DecodeError
      nil
    end

    def user_id_in_token?
      http_token && auth_token && auth_token['user_id'].to_i
    end
end