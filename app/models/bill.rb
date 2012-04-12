class Bill < ActiveRecord::Base
  has_many :billitems

  def new_item(item)
    self.billitems.create({product_id:item[:id], price:item[:price], quant:item[:quantity]})
  end
end
