Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_scope :user do
    devise_for :users, controllers: {
        sessions: 'api/users/sessions',
    }, path: 'api/users', defaults: { format: :json }
  end

  namespace :api, defaults: { format: :json } do
    resources :listings
  end
end
