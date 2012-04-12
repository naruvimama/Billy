class RenameProductToNameInProducts < ActiveRecord::Migration
  def up
    rename_column :products, :product, :name
  end

  def down
    rename_column :products, :name, :product
  end
end
