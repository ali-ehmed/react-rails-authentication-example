class Listing < ApplicationRecord
  scope :fake, -> { where(fake: true) }
  belongs_to :user
end
