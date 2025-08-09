# Travel Ninja - Main Platform

A modern Vue 3 application for discovering hotels, places, and experiences. This is the main platform converted from HTML/CSS/JS to Vue 3 with Vite.

## Features

- 🏨 Hotel bookings and listings
- 🚗 Car and bike rentals
- 🏔️ Trekking and adventure tours
- 🎯 Guided experiences and group tours
- 👤 User authentication and profiles
- 💬 Real-time messaging
- 📱 Responsive mobile design
- 🗺️ Interactive maps
- ⭐ Reviews and ratings

## Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Routing**: Vue Router 4
- **State Management**: TanStack Query (Vue Query)
- **HTTP Client**: Axios
- **Styling**: CSS with custom design system
- **Maps**: Mapbox GL

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── api/           # API service modules
├── assets/        # Static assets (images, fonts)
├── components/    # Reusable Vue components
├── composables/   # Vue 3 composables
├── router/        # Vue Router configuration
├── views/         # Page components
└── style.css      # Global styles
```

## API Integration

The application integrates with the Travel Ninja API backend. Make sure the API server is running and accessible at the configured endpoint.

## Development

- Uses Vue 3 Composition API with `<script setup>`
- Implements proper TypeScript support
- Follows Vue 3 best practices
- Responsive design with mobile-first approach
