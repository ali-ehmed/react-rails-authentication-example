module Api
  class ListingsController < ApplicationController
    before_action :authenticate_user!

    def index
      json! :ok, listings: current_user.listings.as_json
    end
  end
end