class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :listings

  def jwt_payload
    super.merge('user_id' => id)
  end
end
