class CreateClients < ActiveRecord::Migration[7.1]
  def change
    create_table :clients do |t|
      t.string :name
      t.date :relationship_start
      t.string :address_city
      t.string :address_postal_code
      t.string :address_street
      t.string :address_apt
      t.integer :activity_type
      t.string :info_email

      t.timestamps
    end
  end
end
