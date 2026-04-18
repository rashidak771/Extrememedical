import labImg from "@/assets/cat-lab.jpg";
import microImg from "@/assets/cat-microbiology.jpg";
import seroImg from "@/assets/cat-serology.jpg";
import foodImg from "@/assets/cat-food.jpg";
import vetImg from "@/assets/cat-veterinary.jpg";
import consImg from "@/assets/cat-consumables.jpg";

export const company = {
  name: "Extreme Medical Solution W.L.L",
  short: "Extreme Medical",
  tagline: "Trusted Medical & Laboratory Equipment Supplier in Qatar",
  founded: 2015,
  email: "info@extrememedical.qa",
  phone: "+974 77446264",
  fax: "+974 44505053",
  location: "Doha, Qatar",
  hours: "Sun - Thu | 8:00 AM - 6:00 PM",
};

export type Category = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  items: string[];
};

export const categories: Category[] = [
  {
    slug: "laboratory-equipment",
    title: "Laboratory Equipment",
    short: "Precision instruments for clinical & research labs.",
    description:
      "Centrifuges, incubators, autoclaves, microscopes, spectrophotometers and analyzers from globally trusted manufacturers - calibrated and ready for clinical, research and diagnostic workflows.",
    image: labImg,
    items: [
      "Centrifuges (benchtop & refrigerated)",
      "Microscopes (binocular & trinocular)",
      "Autoclaves & sterilizers",
      "Incubators & water baths",
      "Spectrophotometers",
      "Hematology & biochemistry analyzers",
    ],
  },
  {
    slug: "consumables",
    title: "Lab Consumables",
    short: "Daily-use disposables for every workflow.",
    description:
      "A complete catalog of consumables - pipette tips, petri dishes, swabs, tubes, gloves and PPE - sourced to international quality standards and stocked for fast delivery across Qatar.",
    image: consImg,
    items: [
      "Pipette tips & micropipettes",
      "Petri dishes & culture flasks",
      "Test tubes & vacutainers",
      "Microscope slides & cover slips",
      "Swabs & transport media",
      "PPE, gloves & lab coats",
    ],
  },
  {
    slug: "microbiology-stains",
    title: "Microbiology Stains",
    short: "Reagents for accurate microbial identification.",
    description:
      "High-purity Gram, Ziehl-Neelsen, Giemsa, methylene blue and other stains for clinical microbiology, plus prepared media and identification kits.",
    image: microImg,
    items: [
      "Gram stain kits",
      "Ziehl-Neelsen (AFB) stains",
      "Giemsa & Wright stains",
      "Methylene blue & safranin",
      "Prepared culture media",
      "Identification kits",
    ],
  },
  {
    slug: "serology-rapid-cards",
    title: "Serology & Rapid Cards",
    short: "Fast, reliable point-of-care diagnostics.",
    description:
      "Rapid antigen, antibody and hormone test cards used by clinics and reference laboratories for fast bedside or counter-top decisions.",
    image: seroImg,
    items: [
      "Infectious disease rapid tests",
      "Hormone & pregnancy tests",
      "Cardiac marker assays",
      "Drug-of-abuse panels",
      "Blood typing reagents",
      "ELISA kits & controls",
    ],
  },
  {
    slug: "food-water-poultry",
    title: "Food, Water & Poultry",
    short: "Quality and safety testing for what matters.",
    description:
      "Equipment and consumables for food safety, potable water and poultry industry quality control - supporting compliance with Qatari and international standards.",
    image: foodImg,
    items: [
      "Microbiological food testing",
      "Water quality test kits",
      "Poultry health diagnostics",
      "Sample collection & transport",
      "Incubation & enumeration",
      "Compliance documentation",
    ],
  },
  {
    slug: "veterinary",
    title: "Veterinary Products",
    short: "Diagnostics & supplies for animal health.",
    description:
      "Diagnostics, consumables and instruments for small-animal clinics, equine practices and veterinary reference laboratories across the region.",
    image: vetImg,
    items: [
      "Veterinary rapid tests",
      "Animal hematology supplies",
      "Surgical & diagnostic tools",
      "Anesthesia accessories",
      "Vaccine cold-chain storage",
      "Farm & herd diagnostics",
    ],
  },
];

export const services = [
  {
    title: "Procurement & Sourcing",
    description:
      "Single point of contact for sourcing certified medical and laboratory products from approved manufacturers worldwide.",
  },
  {
    title: "Installation & Commissioning",
    description:
      "On-site installation, calibration and commissioning by trained engineers - your lab runs from day one.",
  },
  {
    title: "After-Sales Support",
    description:
      "Spare parts, preventive maintenance and responsive service contracts to maximise uptime and equipment life.",
  },
  {
    title: "Training & Knowledge Transfer",
    description:
      "Hands-on operator training and SOP development so your team uses every instrument safely and confidently.",
  },
  {
    title: "Consultation & Lab Setup",
    description:
      "Turnkey consulting for new laboratories - from layout planning to instrument selection and workflow design.",
  },
  {
    title: "Logistics & Cold Chain",
    description:
      "Reliable in-country logistics including temperature-controlled handling for sensitive reagents and vaccines.",
  },
];

export const stats = [
  { value: "10+", label: "Years in Qatar" },
  { value: "500+", label: "Products Supplied" },
  { value: "120+", label: "Healthcare Partners" },
  { value: "24/7", label: "Support Response" },
];

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];
