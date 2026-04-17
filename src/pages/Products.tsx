import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { categories } from "@/data/site";

const Products = () => (
  <>
    <PageHeader
      eyebrow="Products"
      title="A complete catalog for clinical, research and food-safety labs."
      description="Browse our six main categories — every item is sourced from internationally trusted manufacturers and supported locally in Qatar."
      crumbs={[{ label: "Home", to: "/" }, { label: "Products" }]}
    />

    <section className="py-20">
      <div className="container mx-auto container-px">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to={`/products/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-card border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={c.image} alt={c.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur rounded-full px-3 py-1 text-xs font-mono text-primary">
                  0{i + 1}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-primary group-hover:text-accent transition">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.short}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  View details <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Products;
