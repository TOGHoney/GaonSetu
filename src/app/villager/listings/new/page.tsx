"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Wheat,
  Milk,
  Apple,
  Tractor,
  Palette,
  Store,
  HelpCircle,
  Upload,
  ArrowLeft,
  ArrowRight,
  Check,
  Camera,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StepProgress from "@/components/common/StepProgress"
import { cn } from "@/lib/utils"

const stepLabels = ["Category", "Details", "Location", "Photos", "Review"]

const categories = [
  { id: "CROP", label: "Crop", icon: Wheat, color: "bg-green-50 text-green-600 border-green-200" },
  { id: "MILK", label: "Milk", icon: Milk, color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: "FRUITS_VEGETABLES", label: "Fruits & Vegetables", icon: Apple, color: "bg-red-50 text-red-600 border-red-200" },
  { id: "LIVESTOCK", label: "Livestock", icon: Tractor, color: "bg-amber-50 text-amber-600 border-amber-200" },
  { id: "HANDMADE", label: "Handmade", icon: Palette, color: "bg-purple-50 text-purple-600 border-purple-200" },
  { id: "BUSINESS", label: "Business", icon: Store, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  { id: "OTHER", label: "Other", icon: HelpCircle, color: "bg-gray-50 text-gray-600 border-gray-200" },
]

export default function NewListing() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [photos, setPhotos] = useState<string[]>([])

  // Form state
  const [formData, setFormData] = useState({
    // Step 2 - Crop
    cropName: "",
    season: "",
    quantity: "",
    unit: "kg",
    harvestStatus: "",
    isOrganic: false,
    price: "",
    description: "",
    // Step 2 - Milk
    milkType: "",
    dailyQuantity: "",
    supplyTime: "",
    isRecurring: true,
    pricePerLiter: "",
    deliveryOption: "",
    // Step 2 - Business
    businessName: "",
    businessCategory: "",
    servicesOffered: "",
    operatingHours: "",
    homeDelivery: false,
    localPickup: true,
    // Step 2 - Other/Goods
    title: "",
    // Step 3 - Location
    village: "Rampur",
    district: "Alwar",
    state: "Rajasthan",
    pincode: "301001",
    contactPhone: "9876543210",
  })

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    if (step === 1) return !!selectedCategory
    if (step === 2) {
      if (selectedCategory === "CROP") return formData.cropName && formData.price
      if (selectedCategory === "MILK") return formData.milkType && formData.pricePerLiter
      if (selectedCategory === "BUSINESS") return formData.businessName
      return formData.title && formData.price
    }
    if (step === 3) return formData.village && formData.contactPhone
    return true
  }

  const handleSubmit = () => {
    router.push("/villager/listings")
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <StepProgress currentStep={step} totalSteps={5} stepLabels={stepLabels} />

      {/* Step 1: Category */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all",
                    selectedCategory === cat.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-border hover:border-primary-300"
                  )}
                >
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", cat.color)}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{cat.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedCategory === "CROP" && "Crop Details"}
              {selectedCategory === "MILK" && "Milk Details"}
              {selectedCategory === "BUSINESS" && "Business Details"}
              {["FRUITS_VEGETABLES", "LIVESTOCK", "HANDMADE", "OTHER"].includes(selectedCategory) && "Product Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Crop Fields */}
            {selectedCategory === "CROP" && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Crop Name</Label>
                    <Input value={formData.cropName} onChange={(e) => updateField("cropName", e.target.value)} placeholder="e.g. Wheat, Rice, Mustard" className="mt-1" />
                  </div>
                  <div>
                    <Label>Season</Label>
                    <Select value={formData.season} onValueChange={(v) => updateField("season", v)}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select season" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kharif">Kharif (Monsoon)</SelectItem>
                        <SelectItem value="Rabi">Rabi (Winter)</SelectItem>
                        <SelectItem value="Zaid">Zaid (Summer)</SelectItem>
                        <SelectItem value="Year Round">Year Round</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Quantity</Label>
                    <Input value={formData.quantity} onChange={(e) => updateField("quantity", e.target.value)} placeholder="Available quantity" className="mt-1" />
                  </div>
                  <div>
                    <Label>Unit</Label>
                    <Select value={formData.unit} onValueChange={(v) => updateField("unit", v)}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="quintal">Quintal</SelectItem>
                        <SelectItem value="ton">Ton</SelectItem>
                        <SelectItem value="bag">Bag</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Harvest Status</Label>
                    <Select value={formData.harvestStatus} onValueChange={(v) => updateField("harvestStatus", v)}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ready to Harvest">Ready to Harvest</SelectItem>
                        <SelectItem value="Harvested">Harvested</SelectItem>
                        <SelectItem value="Growing">Growing</SelectItem>
                        <SelectItem value="Pre-season">Pre-season</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Price per Unit (₹)</Label>
                    <Input type="number" value={formData.price} onChange={(e) => updateField("price", e.target.value)} placeholder="e.g. 45" className="mt-1" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="organic" checked={formData.isOrganic} onChange={(e) => updateField("isOrganic", e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary-500" />
                  <Label htmlFor="organic" className="cursor-pointer">Certified Organic</Label>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={formData.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Describe your product quality, farming methods..." className="mt-1" rows={3} />
                </div>
              </>
            )}

            {/* Milk Fields */}
            {selectedCategory === "MILK" && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Milk Type</Label>
                    <Select value={formData.milkType} onValueChange={(v) => updateField("milkType", v)}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cow">Cow Milk</SelectItem>
                        <SelectItem value="buffalo">Buffalo Milk</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Daily Quantity (liters)</Label>
                    <Input type="number" value={formData.dailyQuantity} onChange={(e) => updateField("dailyQuantity", e.target.value)} placeholder="e.g. 20" className="mt-1" />
                  </div>
                  <div>
                    <Label>Supply Time</Label>
                    <Select value={formData.supplyTime} onValueChange={(v) => updateField("supplyTime", v)}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select time" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (6 AM - 10 AM)</SelectItem>
                        <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Price per Liter (₹)</Label>
                    <Input type="number" value={formData.pricePerLiter} onChange={(e) => updateField("pricePerLiter", e.target.value)} placeholder="e.g. 60" className="mt-1" />
                  </div>
                  <div>
                    <Label>Delivery Option</Label>
                    <Select value={formData.deliveryOption} onValueChange={(v) => updateField("deliveryOption", v)}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select option" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pickup">Pickup Only</SelectItem>
                        <SelectItem value="delivery">Home Delivery</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="recurring" checked={formData.isRecurring} onChange={(e) => updateField("isRecurring", e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary-500" />
                  <Label htmlFor="recurring" className="cursor-pointer">Daily Recurring Supply</Label>
                </div>
              </>
            )}

            {/* Business Fields */}
            {selectedCategory === "BUSINESS" && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Business Name</Label>
                    <Input value={formData.businessName} onChange={(e) => updateField("businessName", e.target.value)} placeholder="e.g. Sharma Grocery Store" className="mt-1" />
                  </div>
                  <div>
                    <Label>Business Category</Label>
                    <Select value={formData.businessCategory} onValueChange={(v) => updateField("businessCategory", v)}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grocery">Grocery</SelectItem>
                        <SelectItem value="tailoring">Tailoring</SelectItem>
                        <SelectItem value="repair">Repair Services</SelectItem>
                        <SelectItem value="food">Food & Catering</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="education">Tutoring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Services Offered</Label>
                    <Textarea value={formData.servicesOffered} onChange={(e) => updateField("servicesOffered", e.target.value)} placeholder="Describe services you offer..." className="mt-1" rows={3} />
                  </div>
                  <div>
                    <Label>Operating Hours</Label>
                    <Input value={formData.operatingHours} onChange={(e) => updateField("operatingHours", e.target.value)} placeholder="e.g. 9 AM - 8 PM" className="mt-1" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="homeDelivery" checked={formData.homeDelivery} onChange={(e) => updateField("homeDelivery", e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary-500" />
                    <Label htmlFor="homeDelivery" className="cursor-pointer">Home Delivery</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="localPickup" checked={formData.localPickup} onChange={(e) => updateField("localPickup", e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary-500" />
                    <Label htmlFor="localPickup" className="cursor-pointer">Local Pickup</Label>
                  </div>
                </div>
              </>
            )}

            {/* Other/Goods Fields */}
            {["FRUITS_VEGETABLES", "LIVESTOCK", "HANDMADE", "OTHER"].includes(selectedCategory) && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label>Title</Label>
                    <Input value={formData.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Product title" className="mt-1" />
                  </div>
                  <div>
                    <Label>Quantity</Label>
                    <Input value={formData.quantity} onChange={(e) => updateField("quantity", e.target.value)} placeholder="Available quantity" className="mt-1" />
                  </div>
                  <div>
                    <Label>Unit</Label>
                    <Select value={formData.unit} onValueChange={(v) => updateField("unit", v)}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="piece">Piece</SelectItem>
                        <SelectItem value="dozen">Dozen</SelectItem>
                        <SelectItem value="liter">Liter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Price per Unit (₹)</Label>
                    <Input type="number" value={formData.price} onChange={(e) => updateField("price", e.target.value)} placeholder="e.g. 30" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={formData.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Describe your product..." className="mt-1" rows={3} />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Location */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Location & Contact</CardTitle>
            <p className="text-sm text-text-secondary">Auto-filled from your profile. Edit if needed.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Village</Label>
                <Input value={formData.village} onChange={(e) => updateField("village", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>District</Label>
                <Input value={formData.district} onChange={(e) => updateField("district", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>State</Label>
                <Input value={formData.state} onChange={(e) => updateField("state", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Pincode</Label>
                <Input value={formData.pincode} onChange={(e) => updateField("pincode", e.target.value)} className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label>Contact Phone</Label>
                <Input value={formData.contactPhone} onChange={(e) => updateField("contactPhone", e.target.value)} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Photos */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upload Photos</CardTitle>
            <p className="text-sm text-text-secondary">Add up to 5 photos of your product (optional)</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {photos.map((_, i) => (
                <div key={i} className="relative flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-primary-300 bg-primary-50">
                  <Camera className="h-8 w-8 text-primary-300" />
                  <button
                    onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                    className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
              {photos.length < 5 && (
                <button
                  onClick={() => setPhotos((prev) => [...prev, `photo-${Date.now()}`])}
                  className="flex h-32 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary-400 hover:bg-primary-50"
                >
                  <Upload className="h-8 w-8 text-muted" />
                  <span className="text-xs text-text-secondary">Add Photo</span>
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Preview */}
      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Review & Submit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-text-primary">Category</h3>
                <Badge variant="secondary">{categories.find((c) => c.id === selectedCategory)?.label}</Badge>
              </div>
            </div>

            <div className="rounded-lg border p-4 space-y-2">
              <h3 className="font-semibold text-text-primary">Details</h3>
              {selectedCategory === "CROP" && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-text-secondary">Crop:</span><span>{formData.cropName || "-"}</span>
                  <span className="text-text-secondary">Season:</span><span>{formData.season || "-"}</span>
                  <span className="text-text-secondary">Quantity:</span><span>{formData.quantity} {formData.unit}</span>
                  <span className="text-text-secondary">Price:</span><span>₹{formData.price}/{formData.unit}</span>
                  <span className="text-text-secondary">Organic:</span><span>{formData.isOrganic ? "Yes" : "No"}</span>
                </div>
              )}
              {selectedCategory === "MILK" && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-text-secondary">Type:</span><span>{formData.milkType}</span>
                  <span className="text-text-secondary">Daily Qty:</span><span>{formData.dailyQuantity} liters</span>
                  <span className="text-text-secondary">Price/L:</span><span>₹{formData.pricePerLiter}</span>
                  <span className="text-text-secondary">Supply:</span><span>{formData.supplyTime}</span>
                </div>
              )}
              {selectedCategory === "BUSINESS" && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-text-secondary">Name:</span><span>{formData.businessName}</span>
                  <span className="text-text-secondary">Category:</span><span>{formData.businessCategory}</span>
                  <span className="text-text-secondary">Hours:</span><span>{formData.operatingHours}</span>
                </div>
              )}
              {["FRUITS_VEGETABLES", "LIVESTOCK", "HANDMADE", "OTHER"].includes(selectedCategory) && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-text-secondary">Title:</span><span>{formData.title || "-"}</span>
                  <span className="text-text-secondary">Quantity:</span><span>{formData.quantity} {formData.unit}</span>
                  <span className="text-text-secondary">Price:</span><span>₹{formData.price}/{formData.unit}</span>
                </div>
              )}
            </div>

            <div className="rounded-lg border p-4 space-y-2">
              <h3 className="font-semibold text-text-primary">Location</h3>
              <p className="text-sm text-text-secondary">
                {formData.village}, {formData.district}, {formData.state} - {formData.pincode}
              </p>
              <p className="text-sm text-text-secondary">Phone: {formData.contactPhone}</p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-text-primary">Photos</h3>
              <p className="text-sm text-text-secondary">{photos.length} photo(s) uploaded</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 1}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {step < 5 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" />
            Submit Listing
          </Button>
        )}
      </div>
    </div>
  )
}
