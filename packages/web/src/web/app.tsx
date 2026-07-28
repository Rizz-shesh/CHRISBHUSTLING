import { Route, Switch } from "wouter";
import Index from "./pages/index";
import AdminPage from "./pages/admin";
import BlogPostPage from "./pages/blog-post";
import ServicePage from "./pages/service-page";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import { Provider } from "./components/provider";

function App() {
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
    </Provider>
  );
}

export default App;
