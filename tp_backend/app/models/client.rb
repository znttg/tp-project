class Client < ApplicationRecord
  has_many :contacts, dependent: :destroy

  enum activity_type: { prospect: 0, active: 1, inactive: 2 }

  validates :name, :relationship_start, :address_city, :address_postal_code, :address_street, :activity_type, :info_email, presence: true
  validates :info_email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
