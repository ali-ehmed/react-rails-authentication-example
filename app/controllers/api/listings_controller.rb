module Api
  class ListingsController < ApplicationController
    before_action :authenticate_user!

    def index
      json! :ok, listings: Listing.all.as_json
    end
  end
end