# Setup Instructions for States & Districts Dropdown

## Changes Made

### 1. **Frontend (Dashboard.jsx)**
   - Removed hardcoded states and districts data
   - Added dynamic fetching from API using `useEffect`
   - State and districts are now fetched from backend on component mount
   - Supports ALL Indian states and districts provided by the API

### 2. **Backend - Models**
   - Created `State` model: Stores all Indian states
   - Created `District` model: Stores districts with foreign key to State
   - Models are in `dashboard/models.py`

### 3. **Backend - API Endpoints**
   - `GET /api/dashboard/states/` - Returns all available states
   - `GET /api/dashboard/districts/` - Returns all districts (optional filter by state)
   - `GET /api/dashboard/districts/<state_id>/` - Returns districts for a specific state

### 4. **Backend - Serializers**
   - `StateSerializer` - Serializes State model
   - `DistrictSerializer` - Serializes District with state information

### 5. **Management Command**
   - Created `populate_locations.py` management command
   - Populates database with ALL 28 Indian states and 700+ districts
   - Run this command to populate the database

## Setup Steps

### Step 1: Create & Apply Migrations
```bash
# Navigate to backend directory
cd backend

# Create migration for new models
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

### Step 2: Populate States and Districts
```bash
# Run the management command to populate all states and districts
python manage.py populate_locations
```

### Step 3: Run Backend Server
```bash
# Start the Django development server
python manage.py runserver
```

The server should run on `http://localhost:8000`

### Step 4: Run Frontend
```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Start the development server
npm run dev
```

## API Response Examples

### Get All States
```
GET /api/dashboard/states/

Response:
[
  {"id": 1, "name": "Maharashtra"},
  {"id": 2, "name": "Punjab"},
  ...
]
```

### Get All Districts
```
GET /api/dashboard/districts/

Response:
[
  {"id": 1, "name": "Nagpur", "state": {"id": 1, "name": "Maharashtra"}, "state_name": "Maharashtra"},
  {"id": 2, "name": "Pune", "state": {"id": 1, "name": "Maharashtra"}, "state_name": "Maharashtra"},
  ...
]
```

### Get Districts by State ID
```
GET /api/dashboard/districts/1/

Response:
[
  {"id": 1, "name": "Nagpur", "state": {"id": 1, "name": "Maharashtra"}, "state_name": "Maharashtra"},
  {"id": 2, "name": "Pune", "state": {"id": 1, "name": "Maharashtra"}, "state_name": "Maharashtra"},
  ...
]
```

## Frontend Flow

1. Dashboard component mounts
2. `useEffect` hook triggers API calls to:
   - `/api/dashboard/states/` - Fetch all states
   - `/api/dashboard/districts/` - Fetch all districts
3. States and districts are stored in component state
4. When user selects a state, districts for that state are filtered and displayed
5. User can now select from ANY available state and district

## Database Structure

### State Table
```
id (Primary Key)
name (Unique, max 100 chars)
```

### District Table
```
id (Primary Key)
name (max 100 chars)
state_id (Foreign Key to State)
unique_together: (state, name)
```

## Notes

- All 28 Indian states included
- 700+ districts populated
- Supports easy addition of new states/districts via Django admin
- API endpoints allow dynamic filtering
- Frontend handles loading states gracefully
- Errors during API fetch are shown as toast messages

## Troubleshooting

### Migrations not working?
- Delete old `0002_state_district.py` if it exists
- Run: `python manage.py makemigrations dashboard`
- Run: `python manage.py migrate`

### Dropdown not populating?
- Check if `populate_locations` command was run
- Verify API endpoints are accessible: `http://localhost:8000/api/dashboard/states/`
- Check browser console for API errors

### CORS Issues?
- Ensure `django-cors-headers` is installed and configured
- Check `CORS_ALLOWED_ORIGINS` in `settings.py`

