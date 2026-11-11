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

    // Check vehicle make match
    const compat = product.vehicleCompatibility;
    if (compat.makes && compat.makes.length > 0) {
      const makeMatch = compat.makes.some(
        (m) => m.toLowerCase() === selectedVehicle.make.toLowerCase()
      );
      if (!makeMatch) return false;
    }

    // Check vehicle model match
    if (compat.models && compat.models.length > 0) {
      const modelMatch = compat.models.some(
        (m) =>
          m.toLowerCase().includes(selectedVehicle.model.toLowerCase()) ||
          selectedVehicle.model.toLowerCase().includes(m.toLowerCase())
      );
      if (!modelMatch) return false;
    }

    // Check year match
    if (selectedVehicle.year && compat.years && compat.years.length > 0) {
      if (!compat.years.includes(selectedVehicle.year)) return false;
    }

    // Headlight socket compatibility check for vehicle
    const h4Cars = ["alto", "cultus", "wagonr", "wagon r", "hilux", "swift", "picanto", "mehran", "bolan", "saga"];
    const modelLower = (selectedVehicle.model || "").toLowerCase();
    const isCarH4 = h4Cars.some((c) => modelLower.includes(c));

    // Y6 and TASA are H4-only dual beam kits - incompatible with H11/9005 vehicles like Corolla, Civic, Sportage, Tucson
    if (product.slug === "y6-projector-led-h4" || product.slug === "tasa-h4-premium-led-headlights") {
      if (!isCarH4) return false;
    }

    // Ultra 4-Lens Aux Light is for bikes and off-road pods
    if (product.slug === "ultra-bright-4-lens-fog-aux-light" && (modelLower.includes("corolla") || modelLower.includes("civic"))) {
      return false;
    }

    return true;
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
