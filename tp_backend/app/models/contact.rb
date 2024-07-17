class Contact < ApplicationRecord
  belongs_to :client

  validates :name, :first_name, :email, :tel, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
