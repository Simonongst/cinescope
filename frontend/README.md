# 🎬 CineScope

<br/>

## Screenshot: Home Page

<img src="https://github.com/Simonongst/cinescope/blob/main/frontend/src/assets/CineScope-HomePage.png" width="800">

<br/>

## Screenshot: Favourite Page

<img src="https://github.com/Simonongst/cinescope/blob/main/frontend/src/assets/CineScope-FavouritePage.png" width="800">

<br/>

## CineScope Overview

**CineScope** is a full-stack movie discovery app where users can search for films, filter by genre, and save favourites using Airtable as a backend. It features a cinematic UI with skeleton loading, scroll-to-top behavior, and graceful empty state handling.

### The App Emphasizes:

- Accessibility: Clear genre filters and responsive design.
- User Experience: Smooth search, pagination, and feedback states.
- Modularity: Reusable components and scalable architecture.

CineScope was my way of practicing how to work with external APIs. Using TMDB to get movie data and Airtable to store favourites. It taught me how to handle responses, errors, and how to structure my code so it’s easy to update later.

<br/>

## Getting Started

_Launch the app:_ [CineScope GitHub Repository](https://github.com/Simonongst/cinescope)
<br/>

### How to Use:

1. Search for movies by title using the search bar.
2. Filter movies by selecting one or more genres.
3. Click the ♥ icon to save a movie to your favourites.
4. Click on load more to show more movies or use the scroll-to-top button to quickly return to the top.
5. View saved favourites on the dedicated favourite page.
6. Click the ✕ icon to unfavourite a movie from your favourites.

<br/>

## Project Structure
```
src/
├── components/                  
│   ├── FavouritesCard.jsx       # Renders saved favourites with delete (✕) functionality
│   ├── GenreFilter.jsx          # Genre selection UI with toggle and clear filters
│   ├── MovieCard.jsx            # Displays movie results with poster, info, and ♥ button
│   ├── MovieSearch.jsx          # Search bar with input and clear button
│   ├── NavBar.jsx               # Top navigation with links to Home and Favourites
│   └── SkeletonCard.jsx         # Loading placeholder for movie cards
│
├── pages/                       
│   ├── Favourites.jsx           # Page showing user's saved favourites
│   └── Home.jsx                 # Main page with search, filter, and movie results
│
├── services/                    
│   └── cinescopeService.js      # Handles TMDB and Airtable API calls
│
├── css/                         # Scoped styles for components and pages
│   ├── FavouriteCard.module.css
│   ├── Favourites.module.css
│   ├── GenreFilter.module.css
│   ├── Home.module.css
│   ├── MovieCard.module.css
│   ├── MovieSearch.module.css
│   └── NavBar.module.css
│
├── App.jsx                      # Root component
├── App.module.css               # Layout styles for main content container
├── index.css                    # Global styles
├── main.jsx                     # Application entry point
```
<br/>

## Technologies Used

- JavaScript
- React
- Express
- Node.js
- CSS Modules
- Airtable API
- TMDB API
- react-loading-skeleton

<br/>

## Attributions

- Movie data provided by [TMDB](https://www.themoviedb.org)
- Favourites stored via [Airtable](https://airtable.com)

<br/>

## Next Steps

Planned enhancements:

- Display movie ratings for better viewer insight
- Show casting details including lead actors and directors
- Search by actor/actress to explore their filmography
- Highlight trending movies based on popularity metrics
- Show Top 10 movies by genre or global ranking
- Show platform availability (e.g. Netflix, Disney+)