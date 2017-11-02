class Listing < ApplicationRecord
  scope :fake, -> { where(fake: true) }
end
