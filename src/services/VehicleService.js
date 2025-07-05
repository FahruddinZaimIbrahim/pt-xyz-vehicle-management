import { Vehicle, DEFAULT_VEHICLES } from '../models/Vehicle.js';

class VehicleService {
  constructor() {
    this.vehicles = [...DEFAULT_VEHICLES];
    this.nextId = Math.max(...this.vehicles.map(v => v.id), 0) + 1;
  }

  getAllVehicles() {
    return [...this.vehicles];
  }

  getVehicleById(id) {
    return this.vehicles.find(vehicle => vehicle.id === id);
  }

  createVehicle(vehicleData) {
    const vehicle = new Vehicle({
      ...vehicleData,
      id: this.nextId++
    });

    const validation = vehicle.validate();
    if (!validation.isValid) {
      throw new Error(`Validasi gagal: ${Object.values(validation.errors).join(', ')}`);
    }

    this.vehicles.push(vehicle);
    return vehicle;
  }

  updateVehicle(id, vehicleData) {
    const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
    if (index === -1) {
      throw new Error('Kendaraan tidak ditemukan');
    }

    const updatedVehicle = new Vehicle({
      ...vehicleData,
      id
    });

    const validation = updatedVehicle.validate();
    if (!validation.isValid) {
      throw new Error(`Validasi gagal: ${Object.values(validation.errors).join(', ')}`);
    }

    this.vehicles[index] = updatedVehicle;
    return updatedVehicle;
  }

  deleteVehicle(id) {
    const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
    if (index === -1) {
      throw new Error('Kendaraan tidak ditemukan');
    }

    const deletedVehicle = this.vehicles[index];
    this.vehicles.splice(index, 1);
    return deletedVehicle;
  }

  searchVehiclesByBrand(searchTerm) {
    if (!searchTerm) {
      return this.getAllVehicles();
    }

    return this.vehicles.filter(vehicle =>
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filterVehiclesByType(type) {
    if (!type) {
      return this.getAllVehicles();
    }

    return this.vehicles.filter(vehicle => vehicle.type === type);
  }

  getVehicleStatistics() {
    const totalVehicles = this.vehicles.length;
    const totalStock = this.vehicles.reduce((sum, vehicle) => sum + vehicle.stock, 0);
    const totalValue = this.vehicles.reduce((sum, vehicle) => sum + (vehicle.price * vehicle.stock), 0);
    
    const brandCounts = this.vehicles.reduce((acc, vehicle) => {
      acc[vehicle.brand] = (acc[vehicle.brand] || 0) + 1;
      return acc;
    }, {});

    const typeCounts = this.vehicles.reduce((acc, vehicle) => {
      acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
      return acc;
    }, {});

    return {
      totalVehicles,
      totalStock,
      totalValue,
      brandCounts,
      typeCounts
    };
  }
}

const vehicleService = new VehicleService();

export default vehicleService;
