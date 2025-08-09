import { ref, computed, watch } from 'vue';
import api from '@/api/axios';

/**
 * Composable for fetching and managing listing data
 * @param {Ref<string>} listingId - Reactive listing ID
 * @returns {Object} - Reactive listing data, loading state, and error state
 */
export function useListingData(listingId) {
  const listingData = ref(null);
  const loading = ref(false);
  const error = ref('');

  /**
   * Fetch listing data from API
   */
  const fetchListing = async (id) => {
    if (!id) {
      error.value = 'Listing ID is required';
      return;
    }

    loading.value = true;
    error.value = '';

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await api.get(`/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Check if response data exists and is valid
      if (!response.data || (typeof response.data === 'object' && Object.keys(response.data).length === 0)) {
        listingData.value = null;
        console.log('📦 No listing data found for ID:', id);
      } else {
        listingData.value = response.data;
        console.log('📦 Listing Data:', response.data);
      }

    } catch (err) {
      console.error('Failed to fetch listing:', err);
      
      // Handle 404 Not Found specifically
      if (err.response?.status === 404) {
        listingData.value = null;
        error.value = '';  // Don't show error for 404, show "no listing found" instead
      } else {
        error.value = err.response?.data?.message || 
                     err.message || 
                     'Failed to load listing details';
      }
    } finally {
      loading.value = false;
    }
  };

  /**
   * Refresh listing data
   */
  const refresh = () => {
    if (listingId.value) {
      fetchListing(listingId.value);
    }
  };

  /**
   * Check if listing is of a specific type
   */
  const isListingType = (type) => {
    return computed(() => listingData.value?.listing_type === type);
  };

  /**
   * Get listing type category for grouping similar types
   */
  const listingCategory = computed(() => {
    if (!listingData.value?.listing_type) return 'unknown';
    
    const type = listingData.value.listing_type;
    
    // Group similar listing types
    const categories = {
      rental: ['car_rental', 'bike_rental', 'rental'],
      accommodation: ['hotel', 'stay'],
      experience: ['tour', 'trek', 'activity', 'experience']
    };
    
    for (const [category, types] of Object.entries(categories)) {
      if (types.includes(type)) {
        return category;
      }
    }
    
    return 'other';
  });

  /**
   * Check if listing has specific features
   */
  const hasFeature = (feature) => {
    return computed(() => {
      if (!listingData.value?.meta_data) return false;
      
      switch (feature) {
        case 'driver_option':
          return ['car_rental', 'bike_rental', 'rental'].includes(listingData.value.listing_type);
        
        case 'people_selector':
          return ['tour', 'trek', 'activity', 'experience'].includes(listingData.value.listing_type);
        
        case 'itinerary':
          return listingData.value.meta_data.itinerary && 
                 listingData.value.meta_data.itinerary.length > 0;
        
        case 'highlights':
          return listingData.value.meta_data.highlights && 
                 listingData.value.meta_data.highlights.length > 0;
        
        case 'room_selection':
          return ['hotel', 'stay'].includes(listingData.value.listing_type) &&
                 listingData.value.meta_data.room_details;
        
        default:
          return false;
      }
    });
  };

  /**
   * Get formatted listing data for display
   */
  const formattedData = computed(() => {
    if (!listingData.value) return null;

    const data = listingData.value;
    const metaData = data.meta_data || {};

    return {
      // Basic info
      id: data.listing_id,
      title: data.title,
      description: data.description,
      price: data.price,
      type: data.listing_type,
      status: data.status,
      
      // Location info
      location: getLocationData(data),
      
      // Images
      images: getImageData(metaData),
      
      // Supplier info
      supplier: getSupplierData(data.supplier),
      
      // Type-specific data
      details: getTypeSpecificDetails(data.listing_type, metaData),
      
      // Reviews and ratings
      reviews: getReviewData(data),
      
      // Booking info
      booking: getBookingData(metaData),
      
      // Additional info
      amenities: metaData.amenities || [],
      faqs: metaData.faqs || [],
      moreDetails: metaData.more_details || [],
      
      // Raw data for fallback
      raw: data
    };
  });

  /**
   * Helper function to extract location data
   */
  const getLocationData = (data) => {
    const metaData = data.meta_data || {};
    
    return {
      display: metaData.location || 
               metaData.start_location || 
               data.location || 
               'Unknown Location',
      
      startLocation: metaData.start_location,
      endLocation: metaData.end_location,
      mapUrl: metaData.mapUrl || metaData.map_url,
      coordinates: metaData.coordinates
    };
  };

  /**
   * Helper function to extract image data
   */
  const getImageData = (metaData) => {
    return {
      main: metaData.cover_image || 
            metaData.main_image || 
            (metaData.photos && metaData.photos[0]) ||
            '@/assets/images/default-listing.jpg',
      
      gallery: metaData.photos || 
               metaData.gallery_images || 
               [],
      
      thumbnail: metaData.thumbnail
    };
  };

  /**
   * Helper function to extract supplier data
   */
  const getSupplierData = (supplier) => {
    if (!supplier?.profile_data) {
      return {
        name: 'Travel Operator',
        logo: '@/assets/images/avatar.png',
        rating: '4.5',
        reviewScore: '4.2',
        reviewCount: 15,
        operatingHours: '8AM - 9PM Monday to Sunday'
      };
    }

    const profile = supplier.profile_data;
    
    return {
      id: supplier.supplier_id,
      name: profile.business_name || profile.name || 'Travel Operator',
      logo: profile.logo || '@/assets/images/avatar.png',
      rating: profile.rating || '4.5',
      reviewScore: profile.review_score || '4.2',
      reviewCount: profile.review_count || 15,
      operatingHours: profile.operating_hours || profile.hours || '8AM - 9PM Monday to Sunday',
      contactInfo: profile.contact_info,
      description: profile.description
    };
  };

  /**
   * Helper function to extract type-specific details
   */
  const getTypeSpecificDetails = (listingType, metaData) => {
    const baseDetails = {
      duration: metaData.duration,
      capacity: metaData.capacity,
      ageRange: metaData.age_range,
      languages: metaData.languages,
      difficulty: metaData.difficulty
    };

    switch (listingType) {
      case 'car_rental':
        return {
          ...baseDetails,
          model: metaData.model,
          engineCapacity: metaData.engine_capacity,
          transmission: metaData.transmission,
          vehicleType: metaData.vehicle_type,
          fuelType: metaData.fuel_type,
          seats: metaData.seats
        };

      case 'bike_rental':
        return {
          ...baseDetails,
          model: metaData.model,
          engineCapacity: metaData.engine_capacity,
          transmission: metaData.transmission,
          bikeType: metaData.bike_type,
          fuelType: metaData.fuel_type
        };

      case 'tour':
      case 'trek':
        return {
          ...baseDetails,
          tourType: metaData.tour_type || metaData.trek_type,
          durationDays: metaData.duration_days,
          groupSize: metaData.group_size,
          theme: metaData.theme,
          itinerary: metaData.itinerary,
          highlights: metaData.highlights
        };

      case 'activity':
      case 'experience':
        return {
          ...baseDetails,
          activityType: metaData.activity_type,
          minPeople: metaData.min_people,
          maxPeople: metaData.max_people,
          equipment: metaData.equipment,
          safetyGear: metaData.safety_gear
        };

      case 'hotel':
      case 'stay':
        return {
          ...baseDetails,
          checkIn: metaData.check_in,
          checkOut: metaData.check_out,
          roomTypes: metaData.room_details,
          amenities: metaData.amenities,
          facilities: metaData.facilities
        };

      default:
        return baseDetails;
    }
  };

  /**
   * Helper function to extract review data
   */
  const getReviewData = (data) => {
    return {
      overallRating: data.reviews_avg || data.meta_data?.overall_rating || 4.0,
      totalReviews: data.reviews_count || data.meta_data?.total_reviews || 0,
      breakdown: data.meta_data?.rating_breakdown || [],
      reviews: data.reviews || data.meta_data?.reviews || []
    };
  };

  /**
   * Helper function to extract booking data
   */
  const getBookingData = (metaData) => {
    return {
      addOns: metaData.addons || metaData.add_ons || [],
      included: metaData.included || metaData.inclusions || [],
      notIncluded: metaData.not_included || metaData.exclusions || [],
      cancellationNote: metaData.cancellation_note || 'Free cancellation until',
      cancellationDeadline: metaData.cancellation_deadline || 'N/A',
      summary: metaData.rental_summary || metaData.summary || {},
      pricing: metaData.pricing || {},
      availability: metaData.availability || {}
    };
  };

  // Watch for changes in listingId and fetch data
  watch(listingId, (newId) => {
    if (newId) {
      fetchListing(newId);
    }
  }, { immediate: true });

  return {
    // Reactive data
    listingData,
    loading,
    error,
    
    // Computed data
    formattedData,
    listingCategory,
    
    // Methods
    refresh,
    isListingType,
    hasFeature,
    
    // Helper functions exposed for custom usage
    getLocationData: (data) => getLocationData(data),
    getSupplierData: (supplier) => getSupplierData(supplier),
    getTypeSpecificDetails: (type, metaData) => getTypeSpecificDetails(type, metaData)
  };
}

/**
 * Get default values for different listing types
 */
export const getListingDefaults = (listingType) => {
  const defaults = {
    car_rental: {
      includedItems: ['Car', 'Driver', 'Pickup', 'Unlimited Mileage', 'Spare Tire'],
      notIncludedItems: ['Insurance', 'Additional Services', 'Fuel'],
      driverOptions: { with: 'With Driver', without: 'Without Driver' }
    },
    
    bike_rental: {
      includedItems: ['Helmet', 'Box', 'Side Bags', 'Spare Tire'],
      notIncludedItems: ['Insurance', 'Additional Services', 'Fuel'],
      driverOptions: { with: 'With Driver', without: 'Without Driver' }
    },
    
    tour: {
      includedItems: ['Professional guide', 'Transportation', 'Entry fees'],
      notIncludedItems: ['Personal Expenses', 'Insurance', 'Tips'],
      showPeopleSelector: true
    },
    
    trek: {
      includedItems: ['Professional guide', 'Safety equipment', 'Camping gear'],
      notIncludedItems: ['Personal gear', 'Insurance', 'Personal expenses'],
      showPeopleSelector: true
    },
    
    activity: {
      includedItems: ['Professional guide', 'Safety gear', 'Equipment'],
      notIncludedItems: ['Insurance', 'Personal Expenses', 'Transportation'],
      showPeopleSelector: true,
      priceSuffix: '/person'
    },
    
    experience: {
      includedItems: ['Professional guide', 'Equipment', 'Refreshments'],
      notIncludedItems: ['Insurance', 'Personal Expenses', 'Transportation'],
      showPeopleSelector: true,
      priceSuffix: '/person'
    },
    
    hotel: {
      includedItems: ['WiFi', 'Breakfast', 'Room service'],
      notIncludedItems: ['Airport transfer', 'Personal expenses'],
      priceSuffix: '/night'
    },
    
    stay: {
      includedItems: ['WiFi', 'Basic amenities'],
      notIncludedItems: ['Meals', 'Transportation'],
      priceSuffix: '/night'
    }
  };

  return defaults[listingType] || {
    includedItems: [],
    notIncludedItems: [],
    showPeopleSelector: false,
    priceSuffix: ''
  };
};
