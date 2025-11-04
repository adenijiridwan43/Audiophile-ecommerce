// src/app/loading.tsx - Global loading state

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-light-gray border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-dark-gray">Loading...</p>
      </div>
    </div>
  );
}