class BillsController < ApplicationController
  def new
    @bill = Bill.new
    @billitem = Billitem.new
  end

  def create
    @bill= Bill.create
    items = params[:billitems]
    items.each do |item|
      item = item[1] # array of objects turned to hash with the index as the key. The value is the actual object
      @bill.new_item(item)
      Product.sell(item)
    end
    if @bill.save!
      render :json => {success:true}
    end

  end
end
