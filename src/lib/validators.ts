import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["VILLAGER", "CONSUMER"], {
      required_error: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type RegisterInput = z.infer<typeof registerSchema>

export const villagerProfileSchema = z.object({
  village: z
    .string()
    .min(1, "Village name is required")
    .max(200, "Village name must be less than 200 characters"),
  panchayat: z
    .string()
    .min(1, "Panchayat name is required")
    .max(200, "Panchayat name must be less than 200 characters"),
  district: z
    .string()
    .min(1, "District name is required")
    .max(200, "District name must be less than 200 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(100, "State must be less than 100 characters"),
  pincode: z
    .string()
    .min(1, "Pincode is required")
    .regex(/^\d{6}$/, "Please enter a valid 6-digit pincode"),
  occupation: z
    .string()
    .min(1, "Occupation is required")
    .max(200, "Occupation must be less than 200 characters"),
  aadharNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{12}$/.test(val),
      "Aadhar number must be 12 digits"
    ),
  landSize: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d+(\.\d+)?\s*(acres|hectares|bigha)$/i.test(val),
      "Land size must be a number followed by acres, hectares, or bigha"
    ),
  livestock: z.array(z.string()).optional(),
  languagesSpoken: z
    .array(z.string())
    .min(1, "At least one language is required"),
})

export type VillagerProfileInput = z.infer<typeof villagerProfileSchema>

export const createListingSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .min(5, "Title must be at least 5 characters")
      .max(200, "Title must be less than 200 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .min(20, "Description must be at least 20 characters")
      .max(2000, "Description must be less than 2000 characters"),
    category: z.enum(
      [
        "CROP",
        "MILK",
        "FRUITS_VEGETABLES",
        "LIVESTOCK",
        "HANDMADE",
        "BUSINESS",
        "OTHER",
      ],
      { required_error: "Please select a category" }
    ),
    price: z
      .number()
      .min(0, "Price must be greater than 0")
      .max(10000000, "Price is too high"),
    priceUnit: z
      .string()
      .min(1, "Unit is required")
      .max(50, "Unit must be less than 50 characters"),
    quantityAvailable: z
      .number()
      .min(0, "Quantity must be 0 or greater"),
    quantityUnit: z
      .string()
      .min(1, "Quantity unit is required"),
    village: z
      .string()
      .min(1, "Village is required"),
    district: z
      .string()
      .min(1, "District is required"),
    state: z
      .string()
      .min(1, "State is required"),
    pincode: z
      .string()
      .regex(/^\d{6}$/, "Please enter a valid 6-digit pincode"),
    photos: z
      .array(z.string())
      .max(5, "Maximum 5 images allowed")
      .optional(),
    contactPhone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+?[1-9]\d{9,14}$/.test(val),
        "Please enter a valid phone number"
      ),
  })

export type CreateListingInput = z.infer<typeof createListingSchema>

export const createComplaintSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must be less than 2000 characters"),
  category: z.enum(
    [
      "WATER",
      "ELECTRICITY",
      "ROAD",
      "SANITATION",
      "AGRICULTURE",
      "HEALTH",
      "EDUCATION",
      "RATION",
      "CORRUPTION",
      "OTHER",
    ],
    { required_error: "Please select a category" }
  ),
  village: z
    .string()
    .min(1, "Village name is required")
    .max(200, "Village name must be less than 200 characters"),
  district: z
    .string()
    .min(1, "District name is required"),
  state: z
    .string()
    .min(1, "State is required"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Please enter a valid 6-digit pincode"),
  dateOfIssue: z
    .string()
    .min(1, "Date of issue is required")
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Please enter a valid date"
    ),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"], {
    required_error: "Please select priority level",
  }),
  contactPhone: z
    .string()
    .optional(),
  isAnonymous: z.boolean().default(false),
})

export type CreateComplaintInput = z.infer<typeof createComplaintSchema>

export const announcementSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be less than 200 characters"),
  body: z
    .string()
    .min(1, "Body is required")
    .min(10, "Body must be at least 10 characters")
    .max(5000, "Body must be less than 5000 characters"),
  type: z.enum(
    [
      "NOTICE",
      "SCHEME",
      "EMERGENCY",
      "ALERT",
    ],
    { required_error: "Please select announcement type" }
  ),
  targetRole: z
    .enum(["ALL", "VILLAGER", "CONSUMER"], {
      required_error: "Please select target audience",
    })
    .default("ALL"),
  targetArea: z
    .string()
    .optional(),
  publishedAt: z.string().optional(),
  expiresAt: z.string().optional(),
})

export type AnnouncementInput = z.infer<typeof announcementSchema>
