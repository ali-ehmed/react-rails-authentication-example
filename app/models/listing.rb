class Listing < ApplicationRecord
  scope :fake, -> { where(fake: true) }
  belongs_to :user

  def self.search(filters)
    conditions = []
    if filters[:name].present?
      conditions << "lower(name) like '%#{filters[:name].downcase}%'"
    end

    if filters[:price].present?
      min, max = filters[:price].split(',')
      conditions << "price >= #{min.to_i} and price <= #{max.to_i}"
    end

    where(conditions.join(' AND '))
  end
end
