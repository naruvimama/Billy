class CreateBillitems < ActiveRecord::Migration
  def change
    create_table :billitems do |t|
      t.integer :bill_id
      t.integer :product_id
      t.integer :price
      t.integer :quant

      t.timestamps
    end
  end
end
