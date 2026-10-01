import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, Wrench, ShieldCheck, Tag, ShoppingBag, ArrowRight } from 'lucide-react';

interface ArticleData {
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTools: string[];
}

const articles: Record<string, ArticleData> = {
  'replace-cracked-display-vivo-y11': {
    title: 'How to Replace a Cracked Display on Vivo Y11 (2019)',
    category: 'Display Replacement',
    date: '10 Nov 2024',
    readTime: '5 min read',
    summary: 'A step-by-step bench guide to separating broken digitizer glass, cleaning adhesive frames, and installing an OEM tested combo display on the Vivo Y11.',
    keyTools: ['Heat Plate / Separator (80°C - 85°C)', '0.04mm Cutting Wire', 'Precision T2 / Phillips Screwdrivers', 'B-7000 / T-7000 Frame Glue', 'Anti-static Curved Tweezers'],
    content: [
      '1. Thermal Preparation: Heat the device screen assembly on the heating pad at 80°C for approximately 3-4 minutes to soften the factory adhesive border without damaging internal battery cells.',
      '2. Fingerprint Flex Safety: When removing the back panel, avoid inserting pry picks deeply on the upper-mid right section where the fingerprint sensor ribbon connector is seated.',
      '3. Battery Disconnection: Always disconnect the battery connector first before disconnecting the display FPC ribbon to prevent surge damage to the backlight IC.',
      '4. Dry Testing: Before applying adhesive glue, connect the new OEM display combo, power on the handset, and test touch sampling across all 4 screen corners and the dialer keyboard.',
      '5. Clean Frame Seating: Remove all residual shards and dry adhesive beads from the chassis groove using curved tweezers before applying a thin, uniform bead of B-7000 adhesive.',
    ],
  },
  'battery-health-tips-longer-performance': {
    title: 'Battery Health Tips for Longer Performance & Safety',
    category: 'Battery Diagnostics',
    date: '5 Nov 2024',
    readTime: '4 min read',
    summary: 'Understanding zero-cycle lithium-ion cells, PCM protection circuits, and why replacement batteries require proper initial calibration.',
    keyTools: ['Digital Multimeter', 'USB Power Doctor / Ammeter', 'Battery Activation Jig', 'Anti-Static ESD Wrist Strap'],
    content: [
      '1. Zero-Cycle Initialization: New replacement batteries leave the manufacturing facility with roughly 40-50% factory storage charge. Advise customers to complete 3 full 100% charging cycles for fuel-gauge calibration.',
      '2. Under-Voltage Recovery: If a replacement battery reads below 3.0V due to long shelf storage, do not attempt fast charging immediately. Use a battery activation board to trickle-charge the cell safely to 3.7V.',
      '3. Thermistor Pin Verification: Always measure resistance between the GND and NTC (temperature) pins. A normal NTC thermistor should measure between 7kΩ and 12kΩ at room temperature.',
      '4. Overheating Prevention: Avoid using metallic pry tools directly against battery cells during removal. Always use pull tabs or isopropyl alcohol (IPA) to dissolve the pull-tab adhesive safely.',
    ],
  },
  'oca-lamination-pressure-bubble-removal-guide': {
    title: 'OCA Lamination Pressure & Bubble Removal Guide',
    category: 'Screen Refurbishment',
    date: '2 Nov 2024',
    readTime: '6 min read',
    summary: 'Mastering temperature, vacuum time, and autoclave chamber pressure for bubble-free curved and flat display refurbishment.',
    keyTools: ['OCA Lamination Machine', 'Autoclave De-bubble Chamber', '250 Micron OCA Glass Sheets', 'UV Curing Lamp (365nm)', 'Rubber Roller / Alignment Mould'],
    content: [
      '1. Dust-Free Station: OCA refurbishment must be performed in a clean bench / dust-free room. Even microscopic dust particles cause permanent unremovable bubbles during lamination.',
      '2. Vacuum Chamber Settings: Ensure the vacuum pump reaches -95 kPa to -98 kPa before the pneumatic pressing pad engages. Premature pressing traps atmospheric air.',
      '3. Autoclave Pressure: Transfer the laminated display to the de-bubble autoclave set at 45°C - 50°C and 0.5 MPa - 0.6 MPa (70-85 PSI) for 8 to 12 minutes.',
      '4. UV Curing: Once removed from the autoclave, expose the screen perimeter to high-intensity 365nm UV light for 60 seconds to crosslink optical adhesives and prevent micro-bubble return.',
    ],
  },
  'diagnosing-charging-issues-motherboards': {
    title: 'Diagnosing Charging Issues on Common Motherboards',
    category: 'Hardware Diagnostics',
    date: '28 Oct 2024',
    readTime: '5 min read',
    summary: 'How to isolate charging faults between the sub-board flex, VBUS supply line, OVP protection chip, and PMIC switching regulator.',
    keyTools: ['Bench DC Power Supply', 'Stereo Microscope', 'USB-C / Micro-USB Breakout Board', 'Fine-Tip Soldering Station (JBC/T210)'],
    content: [
      '1. USB Power Meter Reading: Connect the phone to a 5V/2A charger with a USB power meter. A 0.00A reading indicates an open VBUS line or blown fuse on the sub-board.',
      '2. Sub-Board Voltage Check: Measure the VBUS test point on the charging flex sub-board. It must read a steady 5.0V - 5.2V. If 0V, replace the charging port flex.',
      '3. Main Board FPC Connection: Trace 5V VBUS up to the main motherboard connector. Loose or damaged FPC connector pins frequently cause fake or intermittent charging.',
      '4. Over-Voltage Protection (OVP) IC: If 5V enters the OVP chip but 0V exits toward the charging IC (PMIC), the OVP IC is shorted or triggered and requires replacement or jumpering.',
    ],
  },
  'diagnosing-charging-flex-failures': {
    title: 'Diagnosing Fake Charging & Microphone Issues in Vivo Y11 Sub-Boards',
    category: 'Charging Hardware',
    date: 'September 24, 2026',
    readTime: '5 min read',
    summary: 'Step-by-step diagnostic guide for testing CC board thermistors and ground isolation before replacing motherboard PMICs.',
    keyTools: ['Multimeter', 'Soldering Iron', '0.02mm Enamelled Jumper Wire', 'Tweezers'],
    content: [
      '1. Check ground isolation on the microphone pins.',
      '2. Inspect the sub-board coaxial antenna socket.',
      '3. Verify 5V VBUS reaches the main FPC ribbon.',
    ],
  },
  'oca-lamination-best-practices': {
    title: 'OCA Lamination Pressure & Bubble Removal for Curved AMOLED Screens',
    category: 'Display Refurbishment',
    date: 'September 20, 2026',
    readTime: '6 min read',
    summary: 'Technician guide to autoclave temperature, vacuum duration, and pre-cure UV cycles for bubble-free display refurbishment.',
    keyTools: ['OCA Machine', 'UV Lamp', 'Roller'],
    content: [
      '1. Set chamber temperature to 45°C.',
      '2. Apply 8 minutes of autoclave pressure.',
    ],
  },
  'lithium-battery-health-and-ic-protection': {
    title: 'OEM Battery Cycle Life & Understanding PCM Protection Circuits',
    category: 'Battery Diagnostics',
    date: 'September 15, 2026',
    readTime: '4 min read',
    summary: 'Why zero-cycle replacement batteries require calibration cycles and how over-voltage protection prevents cell bloating.',
    keyTools: ['Multimeter', 'Battery Activation Jig'],
    content: [
      '1. Measure voltage across positive and negative terminal pads.',
      '2. Check PCM circuit board for bulging or component corrosion.',
    ],
  },
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-6 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Repair Guides</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
          <Tag className="w-3.5 h-3.5" />
          <span>{article.category}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.date}</span>
          </span>
          <span>•</span>
          <span>{article.readTime}</span>
          <span>•</span>
          <span>Abhay Technicals Hardware Lab</span>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-xs sm:text-sm text-sky-900 leading-relaxed font-medium">
        {article.summary}
      </div>

      {/* Recommended Tools */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <Wrench className="w-4 h-4 text-red-600" />
          <span>Recommended Bench Tools &amp; Equipment</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
          {article.keyTools.map((tool, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span>{tool}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Article Content / Steps */}
      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Relevant Parts CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#031538] to-[#0A3982] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-black">Need Compatible Spare Parts for this Repair?</h3>
          <p className="text-xs text-slate-300">
            Find OEM-tested batteries, screens, and charging flex sub-boards backed by testing warranty.
          </p>
        </div>
        <Link
          href="/model-explorer"
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0"
        >
          <span>Find Parts by Phone</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
