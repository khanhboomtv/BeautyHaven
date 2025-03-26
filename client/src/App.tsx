import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/use-scroll-top";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Admin from "@/pages/Admin";

function Router() {
  useScrollTop();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/news" component={News} />
          <Route path="/news/:id" component={NewsDetail} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
