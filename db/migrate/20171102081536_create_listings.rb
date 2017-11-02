class CreateListings < ActiveRecord::Migration[5.0]
  def change
    create_table :listings do |t|
      t.string :name
      t.string :designer
      t.float :price
      t.text :description
      t.string :category
      t.text :seller_comments
      t.boolean :fake, default: false

      t.timestamps
    end
  end
end
