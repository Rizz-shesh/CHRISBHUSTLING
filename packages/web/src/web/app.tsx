import { Route, Switch, useLocation } from "wouter";
import Index from "./pages/index";
import AdminPage from "./pages/admin";
import BlogPostPage from "./pages/blog-post";
import ServicePage from "./pages/service-page";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import { Provider } from "./components/provider";
import { OptinPopup } from "./components/optin-popup";

// Skip the opt-in popup on the admin dashboard and on the contact page itself
// (already mid-conversion there — a second form competing for attention).
const OPTIN_EXCLUDED_PATHS = new Set(["/admin", "/contact"]);

function App() {
  const [path] = useLocation();
  return (
    <Provider>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/services/:slug" component={ServicePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
      </Switch>
      {!OPTIN_EXCLUDED_PATHS.has(path) && <OptinPopup />}
    </Provider>
  );
}

export default App;
