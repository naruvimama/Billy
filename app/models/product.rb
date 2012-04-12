class Product < ActiveRecord::Base
  has_many :billitems
  def self.sell(item)
    prod = self.find(item[:id])
    prod.update_attributes({price:item[:price], quantity:(prod.quantity - item[:quantity].to_i)})
    prod
  end
end
