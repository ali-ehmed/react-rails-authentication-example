Listing.fake.destroy_all
30.times do
  Listing.create(
             name: Faker::Commerce.unique.product_name,
             description: "<ul>#{Faker::Lorem.sentences.map {|p| p.prepend('<li>'); p << '</li>'}.join}</ul>",
             price: Faker::Commerce.price,
             category: Faker::Commerce.department(2, true),
             seller_comments: Faker::Lorem.paragraph(2),
             fake: true
  )
end