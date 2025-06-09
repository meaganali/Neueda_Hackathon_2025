import { NextResponse } from 'next/server';
import astraService from '@/lib/astradb';

export async function GET() {
  try {
    // Only return our three approved charities
    const allCharities = await astraService.getAllCharities();
    const approvedCharityIds = [
      "global-water-foundation", 
      "education-for-all", 
      "childrens-health-fund"
    ];
    
    const approvedCharities = allCharities.filter(
      charity => approvedCharityIds.includes(charity.id)
    );
    
    // If no charities found in DB, initialize with our approved ones
    if (approvedCharities.length === 0) {
      return NextResponse.json({
        success: true,
        data: [
          {
            id: "global-water-foundation",
            name: "Global Water Foundation",
            category: "Environment",
            description: "Provides clean water access to communities in need around the world.",
            impact: "1,500,000 people provided with clean water access",
            location: "Global",
            imageUrl: "/images/charities/global-water-foundation.jpg",
            longDescription: "The Global Water Foundation is dedicated to ensuring that every community has access to clean, safe water. We work with local partners to build sustainable water infrastructure, educate communities on water conservation and sanitation practices, and advocate for water as a basic human right. Our projects include well construction, rainwater harvesting systems, and water purification technologies.",
            goals: [
              "Provide clean water to 5 million people by 2030",
              "Implement water sanitation programs in 1000 communities",
              "Create sustainable water management systems in water-stressed regions"
            ],
            wallet: "0xA1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9"
          },
          {
            id: "education-for-all",
            name: "Education For All",
            category: "Education",
            description: "Supports schools and educational programs in underserved communities.",
            impact: "250,000 children gained access to quality education",
            location: "Multiple Countries",
            imageUrl: "/images/charities/education-for-all.jpg",
            longDescription: "Education For All believes that every child deserves access to quality education regardless of their background or circumstances. We partner with local schools and communities to improve educational infrastructure, provide learning materials, train teachers, and offer scholarships to students in need. Our holistic approach addresses the various barriers to education, from physical access to quality of teaching.",
            goals: [
              "Build or renovate 500 schools in underserved areas",
              "Provide educational materials to 1 million students",
              "Train 10,000 teachers in modern teaching methods"
            ],
            wallet: "0xB2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9"
          },
          {
            id: "childrens-health-fund",
            name: "Children's Health Fund",
            category: "Health",
            description: "Provides medical care and health services to children in need.",
            impact: "500,000 children received essential healthcare",
            location: "Global",
            imageUrl: "/images/charities/childrens-health-fund.jpg",
            longDescription: "The Children's Health Fund is committed to ensuring that every child has access to comprehensive healthcare services. We operate mobile medical clinics, support pediatric facilities in underserved areas, provide vaccinations and preventive care, and offer specialized treatments for children with chronic conditions. Our team of dedicated healthcare professionals works tirelessly to improve children's health outcomes worldwide.",
            goals: [
              "Provide healthcare access to 1 million children by 2030",
              "Deploy 50 mobile medical clinics in remote areas",
              "Conduct health screenings and vaccinations for 2 million children"
            ],
            wallet: "0xC3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0"
          }
        ]
      });
    }
    
    return NextResponse.json({
      success: true,
      data: approvedCharities
    });
  } catch (error) {
    console.error("Error fetching charities:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch charities"
      },
      { status: 500 }
    );
  }
} 