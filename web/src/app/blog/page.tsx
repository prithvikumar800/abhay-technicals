import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, ArrowRight, Wrench } from 'lucide-react';

export const metadata = {
  title: 'Technical Repair Blog & Component Diagnostics',
  description: 'Practical guides and repair diagnostics for mobile technicians: charging IC troubleshooting, OCA glass refurbishment, and battery health checks.',
};

export default function BlogPage() {
  const posts = [
    {
      slug: 'diagnosing-charging-flex-failures',
      title: 'Diagnosing Fake Charging & Microphone Issues in Vivo Y11 Sub-Boards',
      excerpt:
        'Step-by-step diagnostic guide for testing CC board thermistors and ground isolation before replacing motherboard PMICs.',
      date: 'September 24, 2026',
      category: 'Charging Hardware',
    },
    {
      slug: 'oca-lamination-best-practices',
      title: 'OCA Lamination Pressure & Bubble Removal for Curved AMOLED Screens',
      excerpt:
        'Technician guide to autoclave temperature, vacuum duration, and pre-cure UV cycles for bubble-free display refurbishment.',
      date: 'September 20, 2026',
      category: 'Display Refurbishment',
    },
    {
      slug: 'lithium-battery-health-and-ic-protection',
      title: 'OEM Battery Cycle Life & Understanding PCM Protection Circuits',
      excerpt:
        'Why zero-cycle replacement batteries require calibration cycles and how over-voltage protection prevents cell bloating.',
      date: 'September 15, 2026',
      category: 'Battery Diagnostics',
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-content-primary">
          Technical Repair Blog & Workshop Guides
        </h1>
        <p className="text-xs sm:text-sm text-content-secondary">
          Practical diagnostic walkthroughs and hardware tips prepared by experienced workshop technicians.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-slate-300 shadow-xs transition-all space-y-3"
          >
            <div className="flex items-center gap-2 text-[11px] text-content-muted">
              <span className="font-semibold text-brand-accent uppercase tracking-wider">
                {post.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3" />
                <span>{post.date}</span>
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-content-primary hover:text-brand-accent transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            <p className="text-xs text-content-secondary leading-relaxed">{post.excerpt}</p>

            <div className="pt-2">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors"
              >
                <span>Read Full Technical Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
