Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_scope :user do
    devise_for :users, controllers: {
        sessions: 'api/users/sessions',
        registrations: 'api/users/registrations',
    }, path: 'api/users', defaults: { format: :json }

    get 'api/users/verify_authentication' => 'api/users/sessions#verify_authentication'
  end

  namespace :api, defaults: { format: :json } do
    resources :listings
  end
end
