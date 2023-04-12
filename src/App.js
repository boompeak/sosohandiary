import Router from "./pages/Router";
import { Provider } from "react-redux";
import store from "./contexts/configStore";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

// 구글 애널리틱스
const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;
ReactGA.initialize(gaTrackingId);

const history = createBrowserHistory();
history.listen((response) => {
  console.log(response.location.pathname);
  ReactGA.set({ page: response.location.pathname });
  ReactGA.pageview(response.location.pathname);
});

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
