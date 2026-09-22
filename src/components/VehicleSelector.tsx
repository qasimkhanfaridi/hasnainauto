"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Car, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { VEHICLE_DATABASE, SelectedVehicle } from "@/data/vehicles";
import { useVehicle } from "@/context/VehicleContext";

interface VehicleSelectorProps {
  compact?: boolean;
  className?: string;
  onSelected?: () => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  compact = false,
  className = "",
  onSelected,
}) => {
  const router = useRouter();
  const { selectedVehicle, setSelectedVehicle, clearVehicle } = useVehicle();

  const [make, setMake] = useState<string>(selectedVehicle?.make || "");
  const [model, setModel] = useState<string>(selectedVehicle?.model || "");
  const [year, setYear] = useState<string>(selectedVehicle?.year ? String(selectedVehicle.year) : "");

  // Sync state with context if context changes
  useEffect(() => {
    if (selectedVehicle) {
      setMake(selectedVehicle.make || "");
      setModel(selectedVehicle.model || "");
      setYear(selectedVehicle.year ? String(selectedVehicle.year) : "");
    }
  }, [selectedVehicle]);

  const selectedMakeObj = VEHICLE_DATABASE.find((m) => m.name === make);
  const availableModels = selectedMakeObj ? selectedMakeObj.models : [];
  const selectedModelObj = availableModels.find((m) => m.name === model);
  const availableYears = selectedModelObj ? selectedModelObj.years : [];

  const handleMakeChange = (newMake: string) => {
    setMake(newMake);
    setModel("");
    setYear("");
  };

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    setYear("");
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make) return;

    const newVehicle: SelectedVehicle = {
      make,
      model: model || "All Models",
      year: year ? parseInt(year, 10) : undefined,
    };

    setSelectedVehicle(newVehicle);
    if (onSelected) {
      onSelected();
    }
    router.push("/shop");
  };

  const handleQuickSelect = (qMake: string, qModel: string, qYear?: number) => {
    const vehicle: SelectedVehicle = {
      make: qMake,
      model: qModel,
      year: qYear,
    };
    setSelectedVehicle(vehicle);
    setMake(qMake);
    setModel(qModel);
    setYear(qYear ? String(qYear) : "");
    if (onSelected) onSelected();
    router.push("/shop");
  };

  const popularCars = [
    { label: "Corolla", make: "Toyota", model: "Corolla", year: 2020 },
    { label: "Civic", make: "Honda", model: "Civic", year: 2021 },
    { label: "Alto", make: "Suzuki", model: "Alto", year: 2022 },
    { label: "Sportage", make: "KIA", model: "Sportage", year: 2021 },
    { label: "Yaris", make: "Toyota", model: "Yaris", year: 2021 },
    { label: "Swift", make: "Suzuki", model: "Swift", year: 2022 },
    { label: "Tucson", make: "Hyundai", model: "Tucson", year: 2022 },
    { label: "Alsvin", make: "Changan", model: "Alsvin", year: 2022 },
  ];

  return (
    <div
      className={`relative rounded-2xl bg-white border border-gray-200 shadow-card p-4 sm:p-6 md:p-8 ${className}`}
    >
      {/* Decorative Top Accent Glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-red-brand to-transparent opacity-60" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-red-brand text-xs font-bold uppercase tracking-widest mb-1.5">
            <Car className="w-4 h-4" />
            <span>Precision Fitment Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-carbon-900 tracking-tight uppercase">
            FIND ACCESSORIES FOR YOUR CAR
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Filter 100% vehicle-compatible seat covers, headlights, Android panels, and styling parts.
          </p>
        </div>

        {selectedVehicle && (
          <div className="flex items-center gap-2 self-start md:self-auto px-3 py-1.5 rounded-xl bg-red-light border border-red-soft text-red-brand text-xs">
            <span className="font-semibold">
              Active: {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ""}
            </span>
            <button
              type="button"
              onClick={() => {
                clearVehicle();
                setMake("");
                setModel("");
                setYear("");
              }}
              className="p-1 hover:text-red-brand transition-colors"
              title="Clear vehicle filter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Selector Form */}
      <form onSubmit={handleApply} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* 1. Make */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">
            1. Select Make
          </label>
          <div className="relative">
            <select
              value={make}
              onChange={(e) => handleMakeChange(e.target.value)}
              className="w-full h-12 px-3.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-carbon-900 focus:outline-none focus:border-red-brand focus:ring-1 focus:ring-red-brand transition-all appearance-none cursor-pointer"
            >
              <option value="">Choose Manufacturer...</option>
              {VEHICLE_DATABASE.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        {/* 2. Model */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">
            2. Select Model
          </label>
          <div className="relative">
            <select
              value={model}
              onChange={(e) => handleModelChange(e.target.value)}
              disabled={!make}
              className="w-full h-12 px-3.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-carbon-900 focus:outline-none focus:border-red-brand focus:ring-1 focus:ring-red-brand transition-all appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="">
                {make ? "Choose Car Model..." : "Select Make First"}
              </option>
              {availableModels.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        {/* 3. Year */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">
            3. Select Year
          </label>
          <div className="relative">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={!model}
              className="w-full h-12 px-3.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-carbon-900 focus:outline-none focus:border-red-brand focus:ring-1 focus:ring-red-brand transition-all appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="">{model ? "Any Model Year" : "Select Model First"}</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        {/* 4. Action Button */}
        <div className="space-y-1.5 flex flex-col justify-end">
          <label className="block text-[11px] font-bold text-transparent uppercase select-none hidden sm:block">
            Submit
          </label>
          <button
            type="submit"
            disabled={!make}
            className="w-full h-12 px-5 rounded-xl bg-red-brand hover:bg-red-dark text-white font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-red-glow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Show Compatible Parts</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Quick Picks for Pakistan's Most Popular Cars */}
      {!compact && (
        <div className="mt-6 pt-5 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-red-brand" />
            Quick Select:
          </span>
          <div className="flex flex-wrap gap-2">
            {popularCars.map((car) => {
              const isActive =
                selectedVehicle?.make === car.make && selectedVehicle?.model === car.model;
              return (
                <button
                  key={car.label}
                  type="button"
                  onClick={() => handleQuickSelect(car.make, car.model, car.year)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border ${
                    isActive
                      ? "bg-red-brand text-white border-red-brand shadow-red-glow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:border-red-brand/50 hover:text-red-brand"
                  }`}
                >
                  {car.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
