import { Component, type ReactNode } from "react";
import ErrorPage from "../pages/ErrorPage";

type Props = { children: ReactNode };
type State = { error?: unknown };

class ErrorBoundary extends Component<Props, State> {
  state: State = {};

  static getDerivedStateFromError(error: unknown): State {
    return { error };
  }

  render() {
    if (this.state.error !== undefined) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
