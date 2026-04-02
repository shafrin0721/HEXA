import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Layout>
      <div className="container py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground mb-4">
          Welcome to <span className="text-primary">Hexal</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mb-8">
          Your one-stop shop for premium products. Browse our collection and find exactly what you need.
        </p>
        <div className="flex gap-4">
          <Link to="/products">
            <Button size="lg" className="gap-2">
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
