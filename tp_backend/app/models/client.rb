class Client < ApplicationRecord
  has_many :contacts, dependent: :destroy

  enum activity_type: { technology: 0, food: 1, industrial: 2, leisure: 3, other: 4 }

  validates :name, :relationship_start, :address_city, :address_postal_code, :address_street, :activity_type, :info_email, presence: true
  validates :info_email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
