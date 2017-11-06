class AddJitToUsers < ActiveRecord::Migration[5.0]
  def change
    # If you already have user records, you will need to initialize its `jti` column before setting it to not nullable. Your migration will look this way:
    add_column :users, :jti, :string
    User.all.each { |user| user.update_column(:jti, SecureRandom.uuid) }
    change_column_null :users, :jti, false
    add_index :users, :jti, unique: true
  end
end
