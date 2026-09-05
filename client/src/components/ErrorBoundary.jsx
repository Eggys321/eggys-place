import React from "react";

// The app had no error boundary anywhere - any uncaught render error (a bad
// API response shape, a missing field) unmounted the whole tree and left a
// blank white page with no clue what happened. This catches that instead.
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#2F2F2F] text-white text-center px-4">
          <h1 className="text-2xl font-[500]">Something went wrong</h1>
          <p className="text-gray-400 max-w-md">
            This page hit an unexpected error. Try reloading, or go back to the homepage.
          </p>
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="bg-[#B67B0F] text-white px-6 py-2 rounded-full cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
