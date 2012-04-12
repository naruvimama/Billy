Billing::Application.routes.draw do
  ActiveAdmin.routes(self)

  devise_for :admin_users, ActiveAdmin::Devise.config

  resources :products do 
    collection do
      get 'code_autocomplete'
      get 'products_list'
    end
  end 
  resources :bills  
  root :to => "bills#new"
end
