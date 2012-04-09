class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :code
      t.string :product
      t.integer :price
      t.integer :quantity

      t.timestamps
    end
  end
end
