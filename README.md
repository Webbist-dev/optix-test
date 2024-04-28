## Installation

1. Run npm install in root of your project
2. Setup your .env files (use the .env.example in each package)
3. Run npm start in each package or in root

You should see the following for the React application

![Optix tech test](https://i.imgur.com/Uh7FxP3.jpeg)

### Must have(s):
- [x] Movie titles
- [x] Average review score (to 1 decimal place)
- [x] Company that produces the film.
- [x] Movie company data comes from movieCompanies GET request.
- [x] Movies data comes from movies GET request.
- [x] Display total number of movies.
- [x] User must be able to select table row to leave a review with form appearing when there is a selected movie.
- [x] Request to submitReview endpoint and display message returned on response.
- [x] Form must restrict message to 100 characters 
- [x] Form must show an error message if over 100 and invalidate submission in this instance.
- [x] Highlight selected movie row when clicked.
- [x] Handle error and loading states.

### Should have(s)
- [x] Reviews column should be sortable.
- [x] Submit review form should appear in a modal on mobile devices or small breakpoints.

### Could have(s)
- [x] ~~Add a button (or other mechanism) to refresh movies and movie companies.~~
- [ ] Deploy application using docker.

### Extra have(s)
- [x] Rewrite the API code to be typescript
- [x] Add faker data to the API and controls for the developer so you can control how much fake data is in
- [x] Improve the simulated error a toggle for debugging while debugging, not while building
- [x] Setup the project as a monorepo
- [x] Update API to handle pagination for larger data sets
- [x] Update API to handle sort order and sort by of all values not just averageReview
- [x] Added additional data not required by acceptance criteria as toggled content (Show budget/Show release year)

## Notes:

- I chose to rewrite the API because the sorting and heavy lifting of a dataset should be handled by the data layer. I had access to it, so I made the change. Of course, this is not always possible. I also found the dataset too small to be effective, given that the brief included a *should have* stating: Add a button (or other mechanism) to refresh movies and movie companies. I interpreted the "other mechanism" as an opportunity to implement a more common and complex UI pattern

- The new UI required agnostic data sorting, pagination, and user-controlled page size. This could, of course, be improved, optimized, and further developed, but I am happy to discuss any decisions I've made on this project in a follow-up meeting at your convenience.

- *Highlight selected movie row when clicked.* I chose to highlight on hover, but the click event and Dialog I chose to move to a Call to Action in the form of the material UI icon. 

- *Submit review form should appear in a modal on mobile devices or small breakpoints.*: I follow the design concept of ubiquity between devices where possible, so a Dialog on Mobile also made sense in this instance on Desktop, saving additional effort for specific to device.

- In the API, I've used Faker to simulate the data for a larger set. I've also converted the entire project to TypeScript in line with the frontend.

- To further improve this, I would have shared types as a third package in the project or built the API directly in the frontend project, depending on hosting requirements or other functionalities in the roadmap, etc.

- The decision to use Lerna is simply because I use it in most of my projects working in JAMstack environments. I appreciate how it often simplifies setup, with or without containerization.

- The frontend could be compartmentalised more and I havent used Material for a good while, without a design I've thrown together a common UI pattern. I made the concious decision not to use the Data table component so I could implement pagination and page size elements more manually as a demonstration of more complex UI logic implementation. 

- The pattern implemented for pagination has been adopted from work I've done to contribute to the Strapi.io project. You'll find it familiar if you've ever used the Strapi API.

- I've used formik for validation and form control.

- I have conciously not commented this code as an opportunity to discuss it without prompts during a review meeting. 

- To further test the agnostic sorting functionality, I've added the releaseYear and cost fields to the render as optionally displayed content