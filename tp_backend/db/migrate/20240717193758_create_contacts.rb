class CreateContacts < ActiveRecord::Migration[7.1]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :first_name
      t.string :email
      t.string :tel
      t.string :ext
      t.references :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end
