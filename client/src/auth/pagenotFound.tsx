
function PagenotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <h1 className="text-3xl font-bold">404</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default PagenotFound;
