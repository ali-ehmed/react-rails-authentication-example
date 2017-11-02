module Api
  class ListingsController < ApplicationController
    def index
      json! :ok, listings: Listing.all.as_json
    end
  end
end