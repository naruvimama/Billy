class ProductsController < ApplicationController
  http_basic_authenticate_with :name => "theshop", :password => "theshop", :except => [:code_autocomplete, :products_list]

  def code_autocomplete
    @items = Product.where('code like ?', params[:term].upcase+"%")
    items = []
    @items.each {|i|
    items << {label:i.code, id:i.id, code:i.code, name:i.name, price:i.price}
    }
    render :json => items
  end

  def index
    @products = Product.all
  end

  def products_list
    @products = Product.all
  end

  def update
    @product = Product.find(params[:product][:id])
    if @product.update_attributes(params[:product])
      render :json => {success:true, product:@product}
    else
      render :json => {success:false}
    end
  end

  def create
    @product = Product.where({code:params[:product][:code].upcase}).first()
    if @product.nil? 
      params[:product][:code] = params[:product][:code].upcase
      product = Product.create(params[:product])
      render :json => {success:true, product:product}
    else
      render :json => {success:false, msg:"Save failed : Product already exists, edit it from the product database."} 
    end
  end

  def destroy
    Product.find(params[:id]).destroy
    render :json => {success:true}
  end

  def show
    render :json => {success:true, product:Product.find(params[:id])}
  end
end
