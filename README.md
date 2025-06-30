# Movieland

React + Redux + RTK + Bootstrap application that fetches movies from [https://www.themoviedb.org/](https://www.themoviedb.org/)

## 🎯 **Main Tasks Completed**

### **Task 1: Grid Display Implementation**

**What was needed:** Convert vertical movie list to grid display using vanilla CSS
**How we solved it:**

- Created responsive CSS grid layout with `display: grid` and `grid-template-columns: repeat(auto-fit, minmax(220px, 300px))`
- Added proper responsive breakpoints for mobile/tablet/desktop
- Used SCSS variables for maintaineable spacing and sizing
- Grid adapts from 1-2 movies per row on mobile to 4 on desktop/large screens

**Key files:** `src/styles/movies.scss`, `src/styles/_variables.scss`

### **Task 2: YouTube Modal Player**

**What was needed:** Convert inline YouTube player to modal popup
**How we solved it:**

- Extracted all trailer logic into custom `useTrailer` hook
- Created custom modal (no external libs used) overlay with backdrop click-to-close and ESC key support
- Added loading states and error handling for when trailers arent available
- Modal prevents background scrolling and is fully accessible

**Key files:** `src/hooks/useTrailer.js`, `src/components/YoutubePlayer.jsx`

### **Task 3: Infinite Scrolling**

**What was needed:** Load more movies automatically as user scrolls
**How we solved it:**

- Built custom `useInfiniteScroll` hook
- Implemented scroll detection with throttling to avoid perfomance issues
- Handles both intial movies and search results pagination
- Added loading states and proper error handling

**Key files:** `src/hooks/useInfiniteScroll.js`

---

## 🔧 **Additional Improvements**

While working on the main tasks, we also fixed most of the UX and architectural issues noted in the comments in the other branch (code-review)

Less prop drilling, better performance, added error handling and loading states, extracted business logic into hooks and util files...

---

## 🛠️ **Tech Stack Used**

- React 18.2.0 with hooks
- Redux Toolkit for state management
- SCSS with custom variables system
- React Router for navigation
- React Player for YouTube integration
- TMDB API for movie data

---

## 📦 **Getting Started**

```bash
npm install
# Add your TMDB API key to .env file
echo "REACT_APP_TMDB_API_KEY=your_key_here" > .env
npm start
```

---

## 🎨 **Architecture Highlights**

### **Custom Hooks Created**

- `useTrailer()` - Handles modal state, API calls, and YouTube player logic
- `useInfiniteScroll(searchQuery)` - Manages pagination and scroll detection
- `useMovieActions(movie)` - Handles starring and watch later functionality

### **Reusable Components**

- `<EmptyState />` - Consistent empty state UI
- `<MovieGrid />` - Reusable movie listing with header/footer
- `<ActionButtons />` - Star, watch later, and trailer buttons

### **Utility Functions**

- `movieUtils.js` - Data formatting and URL generation
- `apiUtils.js` - TMDB endpoint building with proper encoding
- `confirmationUtils.js` - Standardized user confirmations
