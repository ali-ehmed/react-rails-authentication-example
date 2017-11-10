class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include ActionController::Helpers
  include ActionView::Helpers::TagHelper
  include ActionView::Context

  include Authenticable

  # All HTTP Status Code here in Constant
  HTTP_STATUS = {
      ok:                     { code: 200, message: 'Success' },
      unauthorized:           { code: 401, message: 'Unauthorized' },
      forbidden:              { code: 403, message: 'Forbidden' },
      not_found:              { code: 404, message: 'Not Found' },
      not_acceptable:         { code: 406, message: 'Not Acceptable' },
      internal_server:        { code: 405, message: 'Internal Server Error' },
      request_timeout:        { code: 408, message: 'Request Timeout' },
      conflict:               { code: 409, message: 'Conflict' }
  }

  protected

    # Use this method in API controllers for rendering response in JSON
    def json!(status, options = {})
      payload = {}

      if status.is_a?(Fixnum) and HTTP_STATUS.values.map { |m| m[:code] }.include(status)
        payload = HTTP_STATUS.find_by_code(status)
      end

      HTTP_STATUS.each_pair do |key, value|
        payload[key] = {
            status: value[:code],
            message: value[:message]
        }
      end

      render json: payload[status.to_sym].merge(options)
    end
end
