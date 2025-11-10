export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="h-12 bg-muted rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <div className="h-48 bg-muted"></div>
            <div className="p-6">
              <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
              <div className="flex items-center justify-between">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}