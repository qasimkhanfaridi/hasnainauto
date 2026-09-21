"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SelectedVehicle } from "@/data/vehicles";
import { Product } from "@/data/products";

interface VehicleContextType {
  selectedVehicle: SelectedVehicle | null;
  setSelectedVehicle: (vehicle: SelectedVehicle | null) => void;
  clearVehicle: () => void;
  isCompatible: (product: Product) => boolean;
  getCompatibilityBadge: (product: Product) => {
    status: "perfect-fit" | "universal" | "incompatible" | "unknown";
    label: string;
  };
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [selectedVehicle, setSelectedVehicleState] = useState<SelectedVehicle | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hasnain_selected_vehicle");
      if (saved) {
        setSelectedVehicleState(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load saved vehicle:", e);
    }
  }, []);

  const setSelectedVehicle = (vehicle: SelectedVehicle | null) => {
    setSelectedVehicleState(vehicle);
    try {
      if (vehicle) {
        localStorage.setItem("hasnain_selected_vehicle", JSON.stringify(vehicle));
      } else {
        localStorage.removeItem("hasnain_selected_vehicle");
      }
    } catch (e) {
      console.error("Failed to persist vehicle:", e);
    }
  };

  const clearVehicle = () => {
    setSelectedVehicle(null);
  };

  const isCompatible = (product: Product): boolean => {
    if (!selectedVehicle || !selectedVehicle.make) return true;
    if (product.vehicleCompatibility.universal) return true;

    const compat = product.vehicleCompatibility;
    const makeMatch = !compat.makes || compat.makes.some(
      (m) => m.toLowerCase() === selectedVehicle.make.toLowerCase()
    );

    const modelMatch = !compat.models || compat.models.some(
      (m) => m.toLowerCase().includes(selectedVehicle.model.toLowerCase()) ||
             selectedVehicle.model.toLowerCase().includes(m.toLowerCase())
    );

    let yearMatch = true;
    if (selectedVehicle.year && compat.years && compat.years.length > 0) {
      yearMatch = compat.years.includes(selectedVehicle.year);
    }

    return makeMatch && modelMatch && yearMatch;
  };

  const getCompatibilityBadge = (product: Product) => {
    if (!selectedVehicle || !selectedVehicle.make) {
      if (product.vehicleCompatibility.universal) {
        return { status: "universal" as const, label: "Universal Fit" };
      }
      return { status: "unknown" as const, label: "Vehicle Specific" };
    }

    if (product.vehicleCompatibility.universal) {
      return { status: "universal" as const, label: `Fits ${selectedVehicle.model || "Your Car"}` };
    }

    const compatible = isCompatible(product);
    if (compatible) {
      return {
        status: "perfect-fit" as const,
        label: `Guaranteed Fit: ${selectedVehicle.make} ${selectedVehicle.model}`,
      };
    } else {
      return {
        status: "incompatible" as const,
        label: `Not Recommended for ${selectedVehicle.model}`,
      };
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        selectedVehicle,
        setSelectedVehicle,
        clearVehicle,
        isCompatible,
        getCompatibilityBadge,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicle() {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicle must be used within a VehicleProvider");
  }
  return context;
}
