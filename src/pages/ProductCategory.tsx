import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { categories, company } from "@/data/site";

const ProductCategory = () => {
  const { slug } = useParams();
  const category = categories.find((item) => item.slug === slug);

  if (!category) return <Navigate to="/products" replace />;

  const others = categories.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${category.title} | ${company.short}`}
        description={category.description}
        path={`/products/${category.slug}`}
      />

      <PageHeader
        eyebrow={category.title}
        title={category.short}
        description={category.description}
        crumbs={[{ label: "Home", to: "/" }, { label: "Products", to: "/products" }, { label: category.title }]}
      />

      <section className="py-20">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-14 items-start">
          <div className="relative">
            <img src={category.image} alt={category.title} loading="lazy" width={1024} height={768} className="rounded-2xl shadow-elegant w-full" />
          </div>
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary leading-tight">About {category.title}</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{category.description}</p>

            <h3 className="mt-10 font-display text-xl font-semibold text-primary">What we supply</h3>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {category.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="coral" size="lg" className="h-12 px-8">
                <Link to="/contact">
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link to="/products">
                  <ArrowLeft className="h-4 w-4" /> Back to Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto container-px">
          <h2 className="font-display text-3xl font-bold text-primary mb-10">Other Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((item) => (
              <Link
                key={item.slug}
                to={`/products/${item.slug}`}
                className="group rounded-2xl overflow-hidden bg-card border shadow-soft hover:shadow-elegant transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-primary group-hover:text-accent transition">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCategory;
