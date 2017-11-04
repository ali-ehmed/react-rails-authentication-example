module Authenticable
  extend ActiveSupport::Concern

  included do
    helper_method :user_signed_in?, :current_user
  end

  protected

    def authenticate_user!
      unless user_id_in_token?
        json! :unauthorized, message: 'Not Authenticated' and return
      end

      @current_user = User.find(auth_token['user_id'])
    rescue JWT::VerificationError, JWT::DecodeError
      json! :unauthorized, message: 'Not Authenticated' and return
    end

    def current_user
      @current_user ||= User.find(auth_token['user_id']) if user_id_in_token?
    end

    def user_signed_in?
      puts auth_token
      current_user.present?
    end

  private

    def http_token
      @http_token ||= request.headers['Authorization']
    end

    def auth_token
      @auth_token ||= JwtWrapper.decode(http_token)
    end

    def user_id_in_token?
      http_token && auth_token && auth_token['user_id'].to_i
    end
end