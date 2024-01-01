
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe')

 mongoose.connect('mongodb://127.0.0.1:27017/Recipe')
 .then(()=>{ 
    console.log("Mongo Connected")
 })
 .catch((e)=>{ 
    console.log(e) 
 })
 const seedData = [
   {
     title: 'Spaghetti Bolognese',
     ingredients: 'Ground beef, onion, garlic, tomato sauce, spaghetti',
     instructions: '1. Cook spaghetti according to package instructions. 2. In a pan, brown ground beef with chopped onions and garlic. 3. Add tomato sauce and simmer. 4. Serve sauce over cooked spaghetti.',
      image:"https://media.istockphoto.com/id/1805531317/photo/christmas-nut-balls.jpg?s=612x612&w=is&k=20&c=-RFx59fRMYSXTPdprBaa7-cx4xmNOK4FVw5CSmwP6EY=",
      description:"Spaghetti Bolognese is a classic Italian pasta dish known for its rich and savory meat sauce. The sauce typically features ground beef, finely chopped onions, and minced garlic cooked in olive oil. Tomato sauce, diced tomatoes, and a blend of herbs such as oregano and basil are added to create a flavorful and hearty sauce.",
      author:"65913e7b74397563d39811e0"
    },
   {
     title: 'Chicken Stir Fry',
     ingredients: 'Chicken breast, mixed vegetables, soy sauce, ginger, garlic, rice',
     instructions: '1. Cook rice according to package instructions. 2. Stir-fry chicken with mixed vegetables, ginger, and garlic. 3. Add soy sauce and cook until chicken is fully cooked. 4. Serve over rice.',
     image:"https://media.istockphoto.com/id/1805531317/photo/christmas-nut-balls.jpg?s=612x612&w=is&k=20&c=-RFx59fRMYSXTPdprBaa7-cx4xmNOK4FVw5CSmwP6EY=",
     description:"Spaghetti Bolognese is a classic Italian pasta dish known for its rich and savory meat sauce. The sauce typically features ground beef, finely chopped onions, and minced garlic cooked in olive oil. Tomato sauce, diced tomatoes, and a blend of herbs such as oregano and basil are added to create a flavorful and hearty sauce.",
     author:"65913e7b74397563d39811e0"

    },
   {
      title: 'Classic Margherita Pizza',
      ingredients: 'Pizza dough, tomato sauce, fresh mozzarella, basil, olive oil',
      instructions: '1. Roll out pizza dough. 2. Spread tomato sauce on the dough. 3. Add slices of fresh mozzarella. 4. Bake until crust is golden and cheese is melted. 5. Garnish with fresh basil and drizzle with olive oil.',
      image:"https://media.istockphoto.com/id/1805531317/photo/christmas-nut-balls.jpg?s=612x612&w=is&k=20&c=-RFx59fRMYSXTPdprBaa7-cx4xmNOK4FVw5CSmwP6EY=",
      description:"Spaghetti Bolognese is a classic Italian pasta dish known for its rich and savory meat sauce. The sauce typically features ground beef, finely chopped onions, and minced garlic cooked in olive oil. Tomato sauce, diced tomatoes, and a blend of herbs such as oregano and basil are added to create a flavorful and hearty sauce.",
      author:"65913e7b74397563d39811e0"

    },
    {
      title: 'Vegetarian Quinoa Salad',
      ingredients: 'Quinoa, cherry tomatoes, cucumber, red onion, feta cheese, olives, olive oil, lemon juice',
      instructions: '1. Cook quinoa according to package instructions. 2. Mix quinoa with chopped tomatoes, cucumber, red onion, feta cheese, and olives. 3. Drizzle with olive oil and lemon juice. 4. Toss and serve chilled.',
      image:"https://media.istockphoto.com/id/1805531317/photo/christmas-nut-balls.jpg?s=612x612&w=is&k=20&c=-RFx59fRMYSXTPdprBaa7-cx4xmNOK4FVw5CSmwP6EY=",
      description:"Spaghetti Bolognese is a classic Italian pasta dish known for its rich and savory meat sauce. The sauce typically features ground beef, finely chopped onions, and minced garlic cooked in olive oil. Tomato sauce, diced tomatoes, and a blend of herbs such as oregano and basil are added to create a flavorful and hearty sauce.",
      author:"65913e7b74397563d39811e0"

    },
    {
      title: 'Chocolate Chip Cookies',
      ingredients: 'All-purpose flour, baking soda, butter, white sugar, brown sugar, eggs, vanilla extract, chocolate chips',
      instructions: '1. Preheat oven to 350°F (175°C). 2. Cream together butter, white sugar, and brown sugar. 3. Beat in eggs and vanilla extract. 4. Combine flour and baking soda, then add to the mixture. 5. Stir in chocolate chips. 6. Drop rounded tablespoons onto ungreased baking sheets. 7. Bake for 10-12 minutes or until edges are golden. 8. Cool on wire racks.',
      image:"https://media.istockphoto.com/id/1805531317/photo/christmas-nut-balls.jpg?s=612x612&w=is&k=20&c=-RFx59fRMYSXTPdprBaa7-cx4xmNOK4FVw5CSmwP6EY=",
      description:"Spaghetti Bolognese is a classic Italian pasta dish known for its rich and savory meat sauce. The sauce typically features ground beef, finely chopped onions, and minced garlic cooked in olive oil. Tomato sauce, diced tomatoes, and a blend of herbs such as oregano and basil are added to create a flavorful and hearty sauce.",
      author:"65913e7b74397563d39811e0"

    },
   // Add more sample recipes as needed
 ];
 async function seedDatabase() {
   try {
     // Clear existing data
     await Recipe.deleteMany();
 
     // Insert seed data
     await Recipe.insertMany(seedData);
 
     console.log('Database seeded successfully');
   } catch (error) {
     console.error('Error seeding database:', error.message);
   }
}
seedDatabase()

