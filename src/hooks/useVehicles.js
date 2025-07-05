import { useState, useEffect, useCallback } from 'react';
import vehicleService from '../services/VehicleService.js';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadVehicles = useCallback(() => {
    setLoading(true);
    try {
      const data = vehicleService.getAllVehicles();
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicleService.searchVehiclesByBrand(searchTerm);
      setFilteredVehicles(filtered);
    }
  }, [searchTerm, vehicles]);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const createVehicle = async (vehicleData) => {
    setLoading(true);
    try {
      const newVehicle = vehicleService.createVehicle(vehicleData);
      loadVehicles();
      setError(null);
      return newVehicle;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (id, vehicleData) => {
    setLoading(true);
    try {
      const updatedVehicle = vehicleService.updateVehicle(id, vehicleData);
      loadVehicles();
      setError(null);
      return updatedVehicle;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id) => {
    setLoading(true);
    try {
      const deletedVehicle = vehicleService.deleteVehicle(id);
      loadVehicles();
      setError(null);
      return deletedVehicle;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getStatistics = () => {
    return vehicleService.getVehicleStatistics();
  };

  return {
    vehicles,
    filteredVehicles,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getStatistics,
    refreshData: loadVehicles
  };
};
