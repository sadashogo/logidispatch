# LogiDispatch MVP - Development Documentation

## 1. Data Model (Schema)

Based on the requirements, here is the logical schema used in the application (implemented via TypeScript interfaces and LocalStorage).

*   **Driver**
    *   `id`: string
    *   `name`: string
    *   `phone`: string
    *   `isOff`: boolean (Simulates off-day logic)
    *   `token`: string (For simplified login link simulation)

*   **Vehicle**
    *   `id`: string
    *   `plateNumber`: string
    *   `status`: 'active' | 'maintenance'

*   **Customer**
    *   `id`: string
    *   `name`: string

*   **Location** (Site/Field)
    *   `id`: string
    *   `name`: string
    *   `address`: string
    *   `permanentNotes`: string (Assets - shown to driver every time)

*   **Order** (Dispatch)
    *   `id`: string
    *   `date`: string (YYYY-MM-DD)
    *   `status`: 'UNASSIGNED' | 'ASSIGNED' | 'COMPLETED' | 'CANCELLED'
    *   `customerId`: string
    *   `startLocationId`: string
    *   `endLocationId`: string
    *   `startTime`: string (HH:mm)
    *   `vehicleId`: string | null
    *   `driverId`: string | null
    *   `isMixedLoad`: boolean
    *   `tripNotes`: string (Specific to this trip)
    *   `updatedAt`: number (Timestamp for history/notifications)

## 2. Screens & Functional Map

### Admin (Web/Desktop)
1.  **Dashboard (Board)**:
    *   View orders by date.
    *   Drag/Drop or Select to assign Driver/Vehicle.
    *   Visual warnings for conflicts (double booking).
2.  **Order Management**:
    *   Create New Order (Modal/Page).
    *   Edit Order Details.
3.  **Print View**:
    *   Printer-friendly CSS generation for the daily manifest.

### Driver (Mobile Web)
1.  **Login**: Simplified via "Driver Link" simulation.
2.  **My Schedule**: List of assigned orders for "Today".
3.  **Order Detail**:
    *   Address (with Map link).
    *   Combined Notes (Trip Notes + Permanent Location Notes).
    *   "Acknowledge" button (updates status/read flag).

## 3. Local Startup
This application is built as a Client-Side SPA using React. No backend server is required for this MVP (it uses Browser LocalStorage).

1.  Ensure Node.js is installed.
2.  Run `npm install` (if dependencies were separate, but here just run the dev server).
3.  **Command**: `npm start` (or standard React script command).

## 4. Manual Test Procedures (QA)

1.  **Case: Create Order**
    *   Go to Admin -> "New Order".
    *   Fill only required fields. Try to save -> Success.
    *   Leave required blank -> Save disabled.

2.  **Case: Assign Driver & Conflict Check**
    *   Create Order A for Date X at 09:00. Assign Driver "Tanaka".
    *   Create Order B for Date X at 10:00. Try to assign Driver "Tanaka".
    *   **Expected**: System displays a warning "Driver already assigned on this date".

3.  **Case: Driver View & Info**
    *   Switch to Driver View (Select "Tanaka").
    *   Verify Order A appears.
    *   Check details: Must see "Permanent Notes" from the Location master data.

4.  **Case: Print**
    *   Admin Dashboard -> Click "Print".
    *   **Expected**: Sidebar disappears, list format changes to black/white high-contrast table.

5.  **Case: Data Persistence**
    *   Refresh the page.
    *   **Expected**: Orders and assignments remain (via LocalStorage).
