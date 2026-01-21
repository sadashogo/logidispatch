export interface Driver {
  id: string;
  name: string;
  phone: string;
  password?: string; // Added for authentication
  isActive: boolean;
  isOff?: boolean; // If true, driver is on leave today
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  contact?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  permanentNotes?: string; // Critical: Rules for this site
}

export type OrderStatus = 'UNASSIGNED' | 'ASSIGNED' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  
  customerId: string;
  startLocationId: string;
  endLocationId: string;
  
  vehicleId?: string;
  driverId?: string;
  assistantId?: string;
  
  isMixedLoad: boolean;
  tripNotes?: string; // Specific to this order
  
  status: OrderStatus;
  updatedAt: number; // For change detection
}

export interface AppState {
  drivers: Driver[];
  vehicles: Vehicle[];
  customers: Customer[];
  locations: Location[];
  orders: Order[];
  currentUser: 'ADMIN' | string | null; // 'ADMIN' or driverId
}
