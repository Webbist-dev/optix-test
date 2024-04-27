### Must have(s):
- [x] Movie titles
- [x] Average review score (to 1 decimal place)
- [x] Company that produces the film.
- [x] Movie company data comes from movieCompanies GET request.
- [x] Movies data comes from movies GET request.
- [x] Display total number of movies.
- [ ] User must be able to select table row to leave a review with form appearing when there is a selected movie.
- [ ] Request to submitReview endpoint and display message returned on response.
- [ ] Form must restrict message to 100 characters and show an error message if over 100 and not allow for submission in this instance.
- [x] Highlight selected movie row when clicked.
- [ ] Handle error and loading states.

### Should have(s)
- [ ] Reviews column should be sortable.
- [ ] Submit review form should appear in a modal on mobile devices or small breakpoints.

### Could have(s)
- [-] Add a button (or other mechanism) to refresh movies and movie companies.
- [ ] Deploy application using docker.

### Extra have(s)
- [x] Rewrite the API code to be typescript
- [x] Add faker data to the API and controls for the developer so you can control how much fake data is in
- [x] Improve the simulated error a toggle for debugging while debugging, not while building
- [x] Setup the project as a monorepo
- [x] Update API to handle pagination for larger data sets
- [x] Update API to handle sort order and sort by of all values not just averageReview