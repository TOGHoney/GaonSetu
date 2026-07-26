import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...\n");

  // Clean existing data (reverse dependency order)
  console.log("🗑️  Cleaning existing data...");
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.contactInquiry.deleteMany();
  await prisma.complaintMedia.deleteMany();
  await prisma.complaint.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.cropDetails.deleteMany();
  await prisma.milkDetails.deleteMany();
  await prisma.businessDetails.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.villagerProfile.deleteMany();
  await prisma.consumerProfile.deleteMany();
  await prisma.adminProfile.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Data cleaned\n");

  const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

  // ─── Admin User ────────────────────────────────────────────
  console.log("👤 Creating Admin user...");
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@gaonsetu.gov.in",
      phone: "9000000001",
      passwordHash: hashPassword("admin123"),
      role: "ADMIN",
      isVerified: true,
      isActive: true,
      adminProfile: {
        create: {
          department: "Rural Development",
          designation: "District Administrator",
          jurisdictionArea: "All Districts",
        },
      },
    },
  });
  console.log(`   ✅ Admin: ${admin.email}`);

  // ─── Villager Users ────────────────────────────────────────
  console.log("\n🧑‍🌾 Creating Villager users...");

  const ram = await prisma.user.create({
    data: {
      name: "Ram Kumar",
      email: "ram@village.in",
      phone: "9876543210",
      passwordHash: hashPassword("villager123"),
      role: "VILLAGER",
      isVerified: true,
      isActive: true,
      villagerProfile: {
        create: {
          village: "Raebareli",
          panchayat: "Lalganj",
          district: "Raebareli",
          state: "Uttar Pradesh",
          pincode: "229230",
          occupation: "Farmer",
          farmingType: "Mixed",
          aadhaarVerified: true,
        },
      },
    },
  });
  console.log(`   ✅ Ram: ${ram.email}`);

  const sita = await prisma.user.create({
    data: {
      name: "Sita Devi",
      email: "sita@village.in",
      phone: "9876543211",
      passwordHash: hashPassword("villager123"),
      role: "VILLAGER",
      isVerified: true,
      isActive: true,
      villagerProfile: {
        create: {
          village: "Varanasi",
          panchayat: "Dashashwamedh",
          district: "Varanasi",
          state: "Uttar Pradesh",
          pincode: "221001",
          occupation: "Dairy Farmer",
          dairyActivity: true,
        },
      },
    },
  });
  console.log(`   ✅ Sita: ${sita.email}`);

  const mohan = await prisma.user.create({
    data: {
      name: "Mohan Singh",
      email: "mohan@village.in",
      phone: "9876543212",
      passwordHash: hashPassword("villager123"),
      role: "VILLAGER",
      isVerified: true,
      isActive: true,
      villagerProfile: {
        create: {
          village: "Lucknow",
          panchayat: "Gomti Nagar",
          district: "Lucknow",
          state: "Uttar Pradesh",
          pincode: "226010",
          occupation: "Small Business",
          smallBusinessCategory: "Handicrafts",
        },
      },
    },
  });
  console.log(`   ✅ Mohan: ${mohan.email}`);

  // ─── Consumer Users ────────────────────────────────────────
  console.log("\n🛒 Creating Consumer users...");

  const priya = await prisma.user.create({
    data: {
      name: "Priya Sharma",
      email: "priya@consumer.in",
      phone: "9123456780",
      passwordHash: hashPassword("consumer123"),
      role: "CONSUMER",
      isVerified: true,
      isActive: true,
      consumerProfile: {
        create: {
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
        },
      },
    },
  });
  console.log(`   ✅ Priya: ${priya.email}`);

  const arjun = await prisma.user.create({
    data: {
      name: "Arjun Patel",
      email: "arjun@consumer.in",
      phone: "9123456781",
      passwordHash: hashPassword("consumer123"),
      role: "CONSUMER",
      isVerified: true,
      isActive: true,
      consumerProfile: {
        create: {
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
        },
      },
    },
  });
  console.log(`   ✅ Arjun: ${arjun.email}`);

  // ─── Listings ──────────────────────────────────────────────
  console.log("\n📦 Creating Listings...");

  const ramWheat = await prisma.listing.create({
    data: {
      villagerId: ram.id,
      category: "CROP",
      title: "Organic Wheat (Geeta Wheat)",
      description: "Freshly harvested organic wheat from our fields",
      price: 2200,
      priceUnit: "quintal",
      quantityAvailable: 50,
      quantityUnit: "quintal",
      quantityLeft: 45,
      village: "Raebareli",
      district: "Raebareli",
      state: "Uttar Pradesh",
      pincode: "229230",
      isActive: true,
      isVerified: true,
      cropDetails: {
        create: {
          cropName: "Wheat (Geeta)",
          season: "Rabi",
          harvestStatus: "Harvested",
          isOrganic: true,
          quantityUnit: "quintal",
        },
      },
    },
  });
  console.log(`   ✅ Listing: ${ramWheat.title}`);

  const ramPotato = await prisma.listing.create({
    data: {
      villagerId: ram.id,
      category: "CROP",
      title: "Fresh Potatoes",
      description: "Freshly harvested potatoes from Raebareli farms",
      price: 1500,
      priceUnit: "quintal",
      quantityAvailable: 100,
      quantityUnit: "quintal",
      quantityLeft: 80,
      village: "Raebareli",
      district: "Raebareli",
      state: "Uttar Pradesh",
      pincode: "229230",
      isActive: true,
      isVerified: true,
      cropDetails: {
        create: {
          cropName: "Potato",
          season: "Rabi",
          harvestStatus: "Harvested",
          isOrganic: false,
          quantityUnit: "quintal",
        },
      },
    },
  });
  console.log(`   ✅ Listing: ${ramPotato.title}`);

  const sitaMilk = await prisma.listing.create({
    data: {
      villagerId: sita.id,
      category: "MILK",
      title: "Fresh Cow Milk",
      description: "Farm-fresh cow milk, delivered daily",
      price: 55,
      priceUnit: "liter",
      quantityAvailable: 50,
      quantityUnit: "liters",
      quantityLeft: 40,
      village: "Varanasi",
      district: "Varanasi",
      state: "Uttar Pradesh",
      pincode: "221001",
      isActive: true,
      isVerified: true,
      milkDetails: {
        create: {
          milkType: "COW",
          dailyQuantity: 50,
          unit: "liters",
          supplyTime: "BOTH",
          isRecurring: true,
          pricePerLiter: 55,
          deliveryOption: "BOTH",
        },
      },
    },
  });
  console.log(`   ✅ Listing: ${sitaMilk.title}`);

  const sitaPaneer = await prisma.listing.create({
    data: {
      villagerId: sita.id,
      category: "OTHER",
      title: "Fresh Homemade Paneer",
      description: "Soft, fresh paneer made from pure cow milk",
      price: 400,
      priceUnit: "kg",
      quantityAvailable: 20,
      quantityUnit: "kg",
      quantityLeft: 15,
      village: "Varanasi",
      district: "Varanasi",
      state: "Uttar Pradesh",
      pincode: "221001",
      isActive: true,
      isVerified: false,
    },
  });
  console.log(`   ✅ Listing: ${sitaPaneer.title}`);

  const mohanCrafts = await prisma.listing.create({
    data: {
      villagerId: mohan.id,
      category: "HANDMADE",
      title: "Chikankari Embroidery Set",
      description: "Beautiful hand-embroidered Chikankari set",
      price: 1500,
      priceUnit: "piece",
      quantityAvailable: 10,
      quantityUnit: "pieces",
      quantityLeft: 8,
      village: "Lucknow",
      district: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
      isActive: true,
      isVerified: true,
    },
  });
  console.log(`   ✅ Listing: ${mohanCrafts.title}`);

  const mohanBusiness = await prisma.listing.create({
    data: {
      villagerId: mohan.id,
      category: "BUSINESS",
      title: "Traditional sweet shop",
      description: "Authentic Indian sweets made fresh daily",
      price: 0,
      priceUnit: "varies",
      quantityAvailable: 0,
      village: "Lucknow",
      district: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
      isActive: true,
      isVerified: true,
      businessDetails: {
        create: {
          businessName: "Singh Sweets",
          businessCategory: "Food & Sweets",
          operatingHours: "8 AM - 9 PM",
          homeDelivery: true,
        },
      },
    },
  });
  console.log(`   ✅ Listing: ${mohanBusiness.title}`);

  // ─── Complaints ────────────────────────────────────────────
  console.log("\n📢 Creating Complaints...");

  const complaint1 = await prisma.complaint.create({
    data: {
      villagerId: ram.id,
      title: "Broken road near Lalganj market",
      description:
        "The main road connecting Lalganj market has developed large potholes making it dangerous for vehicles and pedestrians. Multiple accidents have occurred in the past month.",
      category: "ROAD",
      village: "Raebareli",
      district: "Raebareli",
      state: "Uttar Pradesh",
      pincode: "229230",
      priority: "HIGH",
      status: "UNDER_REVIEW",
      trackingId: "GSC-2026-001234",
    },
  });
  console.log(`   ✅ Complaint: ${complaint1.title}`);

  const complaint2 = await prisma.complaint.create({
    data: {
      villagerId: sita.id,
      title: "Irregular electricity supply",
      description:
        "Electricity supply in Dashashwamedh area has been very irregular. Frequent power cuts lasting 6-8 hours are affecting daily life and dairy operations.",
      category: "ELECTRICITY",
      village: "Varanasi",
      district: "Varanasi",
      state: "Uttar Pradesh",
      pincode: "221001",
      priority: "MEDIUM",
      status: "IN_PROGRESS",
      trackingId: "GSC-2026-005678",
    },
  });
  console.log(`   ✅ Complaint: ${complaint2.title}`);

  const complaint3 = await prisma.complaint.create({
    data: {
      villagerId: mohan.id,
      title: "Water contamination in colony",
      description:
        "Residents of Gomti Nagar colony have reported contaminated drinking water. Several families have fallen ill. Immediate testing and remediation required.",
      category: "WATER",
      village: "Lucknow",
      district: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
      priority: "URGENT",
      status: "SUBMITTED",
      trackingId: "GSC-2026-009012",
    },
  });
  console.log(`   ✅ Complaint: ${complaint3.title}`);

  // ─── Announcements ─────────────────────────────────────────
  console.log("\n📣 Creating Announcements...");

  const announcement1 = await prisma.announcement.create({
    data: {
      adminId: admin.id,
      title: "PM Kisan Samman Nidhi - Registration Open",
      body: "Farmers can now register for PM Kisan scheme through the portal. Eligible farmers will receive ₹6,000 per year in three installments. Visit your nearest Common Service Center to register.",
      type: "SCHEME",
      isPublished: true,
      publishedAt: new Date(),
    },
  });
  console.log(`   ✅ Announcement: ${announcement1.title}`);

  const announcement2 = await prisma.announcement.create({
    data: {
      adminId: admin.id,
      title: "Road Construction Notice - Lalganj",
      body: "Road construction will begin from Lalganj market to the main highway starting next Monday. Expected completion in 3 months. Commuters are advised to use alternate routes.",
      type: "NOTICE",
      isPublished: true,
      publishedAt: new Date(),
    },
  });
  console.log(`   ✅ Announcement: ${announcement2.title}`);

  const announcement3 = await prisma.announcement.create({
    data: {
      adminId: admin.id,
      title: "Heavy Rainfall Warning",
      body: "IMD has issued heavy rainfall warning for Uttar Pradesh for the next 48 hours. Farmers are advised to secure their harvested crops. Stay indoors and avoid unnecessary travel.",
      type: "EMERGENCY",
      isPublished: true,
      publishedAt: new Date(),
    },
  });
  console.log(`   ✅ Announcement: ${announcement3.title}`);

  // ─── Favorites ─────────────────────────────────────────────
  console.log("\n❤️  Creating Favorites...");

  const favorite1 = await prisma.favorite.create({
    data: {
      userId: priya.id,
      listingId: ramWheat.id,
    },
  });
  console.log(`   ✅ Favorite: Priya → ${ramWheat.title}`);

  // ─── Contact Inquiries ─────────────────────────────────────
  console.log("\n📞 Creating Contact Inquiries...");

  const inquiry1 = await prisma.contactInquiry.create({
    data: {
      listingId: ramWheat.id,
      consumerId: arjun.id,
      message:
        "Hi, I am interested in buying 5 quintals of organic wheat. Can you share details about delivery options and bulk pricing?",
      contactMethod: "email",
    },
  });
  console.log(`   ✅ Inquiry: Arjun → ${ramWheat.title}`);

  // ─── Notifications ─────────────────────────────────────────
  console.log("\n🔔 Creating Notifications...");

  const allUsers = [admin, ram, sita, mohan, priya, arjun];

  for (const user of allUsers) {
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Welcome to GaonSetu",
        body: `Welcome ${user.name}! Thank you for joining GaonSetu - the digital bridge connecting rural India with the world.`,
        type: "SYSTEM",
      },
    });
    console.log(`   ✅ Notification sent to ${user.name}`);
  }

  console.log("\n🎉 Database seeded successfully!");
  console.log("──────────────────────────────────");
  console.log("Login credentials:");
  console.log("  Admin:    admin@gaonsetu.gov.in / admin123");
  console.log("  Villager: ram@village.in        / villager123");
  console.log("  Villager: sita@village.in       / villager123");
  console.log("  Villager: mohan@village.in      / villager123");
  console.log("  Consumer: priya@consumer.in     / consumer123");
  console.log("  Consumer: arjun@consumer.in     / consumer123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
