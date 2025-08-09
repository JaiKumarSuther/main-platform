# Unified Listing System

## Overview

The Travel Ninja platform now uses a unified listing system that consolidates all listing types (car, bike, tour, hotel, activity, etc.) into a single, reusable component. This reduces code duplication and makes maintenance much easier.

## Architecture

### 1. Unified Component
- **File**: `src/components/ListingPage.vue`
- **Purpose**: Single component that handles all listing types
- **Features**: 
  - Automatic type detection based on `listing_type` field
  - Conditional rendering for type-specific content
  - Responsive design for all devices

### 2. Data Management
- **File**: `src/composables/useListingData.js`
- **Purpose**: Centralized data fetching and processing
- **Features**:
  - Single API endpoint for all listing types
  - Formatted data extraction
  - Loading and error state management
  - Type-specific data processing

### 3. Routing
- **File**: `src/router/index.js` 
- **Updated**: All listing routes now use `ListingPage` component
- **New Routes**:
  - `/listing/:id` - Generic route for any listing type
  - All existing routes still work (e.g., `/car/:id`, `/tour/:id`)

## Supported Listing Types

Based on the database schema (`ListingType` enum):

1. **Rentals**
   - `car_rental` - Car rentals with driver options
   - `bike_rental` - Bike rentals with driver options  
   - `rental` - Generic rentals

2. **Accommodation**
   - `hotel` - Hotels with room selection
   - `stay` - Other stay options

3. **Experiences**
   - `tour` - Tours with itineraries
   - `trek` - Trekking experiences
   - `activity` - Activities like paragliding
   - `experience` - Guided experiences

## Key Features

### Type-Specific Rendering
The component automatically shows/hides sections based on listing type:

```javascript
// Example: Driver options only for rentals
const getDriverLabel = () => {
  const listingType = listingData.value.listing_type;
  if (['car_rental', 'bike_rental', 'rental'].includes(listingType)) {
    return { with: 'With Driver', without: 'Without Driver' };
  }
  return { with: '', without: '' };
};
```

### Dynamic Details
Each listing type shows relevant details:
- **Car/Bike Rentals**: Model, engine capacity, transmission
- **Tours/Treks**: Duration, difficulty, age range, languages
- **Activities**: Duration, activity type, min people
- **Hotels**: Check-in/out times, amenities

### Conditional Components
Sections are rendered based on data availability:
- **Itinerary**: Only for tours/treks with itinerary data
- **Highlights**: Only when highlights are available
- **Room Selection**: Only for hotels/stays
- **People Selector**: Only for tours/activities

## Usage

### For Developers

1. **Adding a new listing type**:
   - Add to `ListingType` enum in database schema
   - Update type-specific logic in `useListingData.js`
   - Add new route in router if needed

2. **Customizing for a type**:
   - Modify helper functions in `ListingPage.vue`
   - Update data processing in `useListingData.js`

### For Content Managers

All listing types use the same API structure:
```json
{
  "listing_id": "uuid",
  "listing_type": "car_rental|bike_rental|tour|trek|activity|hotel|...",
  "title": "Listing Title", 
  "description": "Description",
  "price": 1000,
  "meta_data": {
    // Type-specific data goes here
    "model": "2017",
    "transmission": "Automatic",
    "photos": ["url1", "url2"],
    "location": "Islamabad"
  },
  "supplier": {
    "profile_data": {
      "business_name": "Operator Name",
      "logo": "logo_url"
    }
  }
}
```

## Benefits

1. **Reduced Code Duplication**: 8+ separate components reduced to 1
2. **Easier Maintenance**: Single place to update listing logic
3. **Consistent UX**: All listing types have same layout and behavior
4. **Scalable**: Easy to add new listing types
5. **Type Safety**: TypeScript interfaces ensure data consistency

## Migration Notes

- All existing routes continue to work
- Search results automatically use unified component
- No changes needed to API responses
- Old component files have been removed

## Files Changed

### Added
- `src/components/ListingPage.vue` - Unified listing component
- `src/composables/useListingData.js` - Data management composable

### Modified  
- `src/router/index.js` - Updated to use unified component
- `src/views/Search.vue` - Updated listing links

### Removed
- `src/views/Activity.vue`
- `src/views/Bike.vue` 
- `src/views/Car.vue`
- `src/views/Hotel.vue`
- `src/views/Trek.vue`
- `src/views/GroupTour.vue`
- `src/views/PrivateTour.vue`
- `src/views/GuidedExperience.vue`

## Testing

To test the unified system:

1. Visit any listing URL (e.g., `/car/123`, `/tour/456`)
2. Verify correct content shows based on listing type
3. Check that type-specific features work (driver options, people selector, etc.)
4. Ensure responsive design works on mobile/desktop

## Future Enhancements

Potential improvements:
- Add more listing types (boat rentals, accommodations, etc.)
- Enhanced filtering by listing type
- Type-specific booking flows
- Advanced customization per supplier
