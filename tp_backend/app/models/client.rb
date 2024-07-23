class Client < ApplicationRecord
  has_many :contacts, dependent: :destroy

  enum activity_type: { technology: 0, food: 1, industrial: 2, leisure: 3, other: 4 }

  validates :name, presence: true
  validates :relationship_start, presence: true
  validates :address_city, presence: true
  validates :address_postal_code, presence: true 
  validates :address_street, presence: true
  validates :address_apt, length: { maximum: 12 }
  validates :activity_type, presence: true
  validates :info_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
end
