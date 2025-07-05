export const VEHICLE_BRANDS = [
  'Toyota',
  'Daihatsu', 
  'Honda',
  'Suzuki',
  'Mitsubishi'
];

export const VEHICLE_TYPES = [
  'SUV',
  'Sedan',
  'Hatchback',
  'MPV',
  'Pickup'
];

export class Vehicle {
  constructor(data = {}) {
    this.id = data.id || null;
    this.brand = data.brand || '';
    this.type = data.type || '';
    this.stock = data.stock || 0;
    this.price = data.price || 0;
    this.description = data.description || '';
  }

  validate() {
    const errors = {};

    if (!this.brand) {
      errors.brand = 'Merek kendaraan harus diisi';
    } else if (!VEHICLE_BRANDS.includes(this.brand)) {
      errors.brand = 'Merek kendaraan tidak valid';
    }

    if (!this.type) {
      errors.type = 'Jenis kendaraan harus diisi';
    } else if (!VEHICLE_TYPES.includes(this.type)) {
      errors.type = 'Jenis kendaraan tidak valid';
    }

    if (!this.stock || this.stock < 1) {
      errors.stock = 'Stok harus lebih dari 0';
    }

    if (!this.price || this.price < 0) {
      errors.price = 'Harga tidak boleh negatif';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  toDisplayFormat() {
    return {
      ...this,
      stockDisplay: `${this.stock} unit`,
      priceDisplay: this.formatCurrency()
    };
  }

  formatCurrency() {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(this.price);
  }
}

export const createVehicle = (data) => new Vehicle(data);

export const DEFAULT_VEHICLES = [
  new Vehicle({
    id: 1,
    brand: 'Toyota',
    type: 'SUV',
    stock: 5,
    price: 250000000,
    description: 'Toyota Fortuner 2019, kondisi sangat baik, service record lengkap'
  }),
  new Vehicle({
    id: 2,
    brand: 'Daihatsu',
    type: 'Sedan',
    stock: 3,
    price: 150000000,
    description: 'Daihatsu Terios 2020, low KM, pajak hidup'
  }),
  new Vehicle({
    id: 3,
    brand: 'Toyota',
    type: 'Sedan',
    stock: 2,
    price: 180000000,
    description: 'Toyota Camry 2018, interior ori, mesin halus'
  })
];
