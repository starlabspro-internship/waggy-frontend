const BASE_URL = "http://localhost:3000";

const API_URLS = {
  PETS: {
    ALL: `${BASE_URL}/api/pets/list`,
    VIEW: (id) => `${BASE_URL}/api/pets/view/${id}`,
    CREATE: `${BASE_URL}/api/pets/new`,
    UPDATE: (id) => `${BASE_URL}/api/pets/edit/${id}`,
    DELETE: (id) => `${BASE_URL}/api/pets/remove/${id}`,
  },
};

// Attach API_URLS to the global window object
  window.API_URLS = API_URLS;
  window.BASE_URL = BASE_URL;
  
