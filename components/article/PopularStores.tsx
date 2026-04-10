'use client';
import React from 'react';
import Link from 'next/link';

const stores = [
  {
    category: "Food",
    categoryUrl: "/food-coupons/",
    items: [
      { name: "Dominos", url: "/dominos-coupons/" },
      { name: "McDonalds", url: "/mcdonalds-coupons/" }
    ]
  },
  {
    category: "Grocery",
    categoryUrl: "/groceries-coupons/",
    items: [
      { name: "Country Delight", url: "/country-delight-coupons/" },
      { name: "Licious", url: "/licious-coupons/" }
    ]
  },
  {
    category: "Travel",
    categoryUrl: "/travel-coupons/",
    items: [
      { name: "Redbus", url: "/redbus-coupons/" },
      { name: "Abhibus", url: "/abhibus-coupons/" },
      { name: "Uber", url: "/uber-coupons/" },
      { name: "Flixbus", url: "/flixbus-coupons/" },
      { name: "Klook", url: "/klook-coupons/" },
      { name: "Skyscanner", url: "/skyscanner-coupons/" },
      { name: "Air India Express", url: "/air-india-express-coupons/" }
    ]
  },
  {
    category: "Flights",
    categoryUrl: "/flight-coupons/",
    items: [
      { name: "Air India", url: "/airindia-coupons/" },
      { name: "Goibibo", url: "/goibibo-coupons/" },
      { name: "Cleartrip", url: "/cleartrip-coupons/" },
      { name: "Happyeasygo", url: "/happyeasygo-coupons/" },
      { name: "Qatar Airways", url: "/qatarairways-coupons/" },
      { name: "EaseMytrip", url: "/easemytrip-coupons/" },
      { name: "Indigo", url: "/indigo-coupons/" },
      { name: "Emirates", url: "/emirates-coupons/" },
      { name: "Etihad", url: "/etihadairways-coupons/" }
    ]
  },
  {
    category: "Hotels",
    categoryUrl: "/hotel-coupons/",
    items: [
      { name: "Agoda", url: "/agoda-coupons/" },
      { name: "Goibibo Hotels", url: "/goibibo-hotels-coupons/" },
      { name: "Booking.com", url: "/booking-coupons/" },
      { name: "Luxury Escapes", url: "/luxuryescapes-coupons/" },
      { name: "Trip.com", url: "/tripcom-coupons/" },
      { name: "Hotels.com", url: "/hotelscom-coupons/" }
    ]
  },
  {
    category: "Fashion",
    categoryUrl: "/fashion-coupons/",
    items: [
      { name: "Myntra", url: "/myntra-coupons/" },
      { name: "Ajio", url: "/ajio-coupons/" },
      { name: "Adidas", url: "/adidas-coupons/" },
      { name: "FirstCry", url: "/firstcry-coupons/" },
      { name: "H&M", url: "/hm-coupons/" },
      { name: "Puma", url: "/pumashop-coupons/" },
      { name: "XYXX", url: "/xyxx-crew-coupons/" }
    ]
  },
  {
    category: "Beauty",
    categoryUrl: "/beauty-coupons/",
    items: [
      { name: "Nykaa", url: "/nykaa-coupons/" },
      { name: "Mamaearth", url: "/mamaearth-coupons/" },
      { name: "Wow", url: "/buywow-coupons/" },
      { name: "Plum", url: "/plumgoodness-coupons/" }
    ]
  },
  {
    category: "OTT",
    categoryUrl: "/ott-coupons/",
    items: [
      { name: "Zee5", url: "/zee5-coupons/" },
      { name: "Sony LIV", url: "/sonyliv-coupons/" },
      { name: "Hoichoi", url: "/hoichoi-coupons/" },
      { name: "OTT Play", url: "/ott-play-coupons/" }
    ]
  },
  {
    category: "Health",
    categoryUrl: "/health-coupons/",
    items: [
      { name: "Muscle Blaze", url: "/muscleblaze-coupons/" },
      { name: "HealthKart", url: "/healthkart-coupons/" },
      { name: "Myprotein", url: "/myprotein-coupons/" },
      { name: "Dr Trust", url: "/dr-trust-coupons/" },
      { name: "Nutrabay", url: "/nutrabay-coupons/" }
    ]
  },
  {
    category: "Hosting",
    categoryUrl: "/hosting-coupons/",
    items: [
      { name: "Hostinger", url: "/hostinger-coupons/" },
      { name: "GoDaddy", url: "/godaddy-coupons/" },
      { name: "BigRock", url: "/bigrock-coupons/" },
      { name: "OVHCloud", url: "/ovhcloud-coupons/" },
      { name: "NameCheap", url: "/namecheap-coupons/" },
      { name: "UltaHost", url: "/ultahost-coupons/" },
      { name: "Internxt", url: "/internxt-coupons/" }
    ]
  },
  {
    category: "Electronics",
    categoryUrl: null,
    items: [
      { name: "Croma", url: "/croma-coupons/" },
      { name: "Dell", url: "/dell-coupons/" },
      { name: "HP", url: "/hpshopping-coupons/" },
      { name: "Lenovo", url: "/lenovo-coupons/" },
      { name: "Samsung", url: "/samsung-coupons/" },
      { name: "Oneplus", url: "/oneplus-coupons/" }
    ]
  },
  {
    category: "Festival",
    categoryUrl: "/festival-offers/",
    items: [
      { name: "Ugadi", url: "/ugadi-offers/" }
    ]
  },
  {
    category: "Other",
    categoryUrl: null,
    items: [
      { name: "Amazon", url: "/amazon-coupons/" },
      { name: "Flipkart", url: "/flipkart-coupons/" },
      { name: "Udemy", url: "/udemy-coupons/" },
      { name: "Durex", url: "/durex-coupons/" },
      { name: "Times Prime", url: "/times-prime-coupons/" },
      { name: "NordVPN", url: "/nordvpn-coupons/" },
      { name: "Chartprime", url: "/chartprime-coupons/" }
    ]
  }
];

export default function PopularStores() {
  return (
    <section className="border-t border-border py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Popular Stores
        </h2>
        <div className="space-y-2.5 font-body text-[17px] leading-[37px]">
          {stores.map(({ category, categoryUrl, items }) => (
            <p key={category} className="leading-relaxed">
              <strong>
                {categoryUrl ? (
                  <a href={categoryUrl} className="text-foreground hover:text-primary transition-colors no-underline">
                    {category}
                  </a>
                ) : (
                  <span className="text-foreground">{category}</span>
                )}
              </strong>
              <span className="text-foreground font-medium"> – </span>
              {items.map((item, i) => (
                <span key={item.name}>
                  <a 
                    href={item.url} 
                    className="text-primary hover:underline transition-colors"
                    title={`${item.name} Coupons`}
                  >
                    {item.name}
                  </a>
                  {i < items.length - 1 && (
                    <span className="text-foreground font-medium mx-1">|</span>
                  )}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
