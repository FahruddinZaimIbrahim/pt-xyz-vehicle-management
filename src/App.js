import React, { useState } from 'react';

import {
  Header,
  SearchBar,
  VehicleForm,
  VehicleTable,
  ErrorMessage,
  LoadingSpinner
} from './components/index.js';

import { useVehicles } from './hooks/useVehicles.js';

const VehicleManagementSystem = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const {
    vehicles,
    filteredVehicles,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    createVehicle,
    updateVehicle,
    deleteVehicle
  } = useVehicles();

  const handleCreate = async (vehicleData) => {
    try {
      await createVehicle(vehicleData);
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating vehicle:', err);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowEditForm(true);
  };

  const handleUpdate = async (vehicleData) => {
    try {
      await updateVehicle(editingVehicle.id, vehicleData);
      setShowEditForm(false);
      setEditingVehicle(null);
    } catch (err) {
      console.error('Error updating vehicle:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
    } catch (err) {
      console.error('Error deleting vehicle:', err);
    }
  };

  const cancelForm = () => {
    setShowCreateForm(false);
    setShowEditForm(false);
    setEditingVehicle(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage error={error} />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => setShowCreateForm(true)}
        />
        {showCreateForm && (
          <VehicleForm
            onSubmit={handleCreate}
            onCancel={cancelForm}
            isLoading={loading}
          />
        )}
        {showEditForm && editingVehicle && (
          <VehicleForm
            isEdit={true}
            initialData={editingVehicle}
            onSubmit={handleUpdate}
            onCancel={cancelForm}
            isLoading={loading}
          />
        )}
        {loading && !showCreateForm && !showEditForm ? (
          <LoadingSpinner text="Memuat data kendaraan..." />
        ) : (
          <VehicleTable
            vehicles={filteredVehicles}
            totalVehicles={vehicles.length}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default VehicleManagementSystem;