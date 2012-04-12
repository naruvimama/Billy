class Billitem < ActiveRecord::Base
  belongs_to :bill
  has_one :product
end
