import { z } from "zod";

export const addServiceValidationSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(2, "name must be at least 2 characters"),
  description: z.string().min(6, "Description is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a non-negative number",
    }),
  duration: z
    .string()
    .min(1, "Duration is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Quantity must be a non-negative number",
    }),
  category: z.string().min(1, "Category is required"),
});

export const updateServiceValidationSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  duration: z.number().optional(),
  price: z.number().optional(),
});

export const categoryOption = [
  { key: "repair", label: "Repair" },
  { key: "others", label: "Others" },
  { key: "maintain", label: "Maintain" },
];

export const vehicleOption = [
  { key: "car", label: "Car" },
  { key: "truck", label: "Truck" },
  { key: "suv", label: "SUV" },
  { key: "van", label: "Van" },
  { key: "motorcycle", label: "Motorcycle" },
  { key: "bus", label: "Bus" },
  { key: "electricVehicle", label: "ElectricVehicle" },
  { key: "hybridVehicle", label: "HybridVehicle" },
  { key: "tractor", label: "Tractor" },
];
