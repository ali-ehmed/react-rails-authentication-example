puts 'Creating User'
User.find_or_create_by!(email: 'aliahmed@example.com') do |user|
  user.password = 'aliahmed'
  user.password_confirmation ='aliahmed'
  user.full_name = 'Ali Ahmed'
  user.username = 'aliahmed922'
end

user = User.find_by(email: 'aliahmed@example.com')
puts "#{user.full_name} just created"

puts 'Creating Listings'
Listing.fake.destroy_all
30.times do
  Listing.create!(
             name: Faker::Commerce.unique.product_name,
             description: "<ul>#{Faker::Lorem.sentences.map {|p| p.prepend('<li>'); p << '</li>'}.join}</ul>",
             price: Faker::Commerce.price,
             category: Faker::Commerce.department(2, true),
             seller_comments: Faker::Lorem.paragraph(2),
             fake: true,
             user_id: user.id
  )
end
puts "Created Listings: (#{Listing.fake.count})"