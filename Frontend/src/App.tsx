import * as React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Container from "./components/Container/Container";
import { ToastProvider } from "./context/ToastContext";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />
        <main className="flex-1">
          <Container />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default App;
