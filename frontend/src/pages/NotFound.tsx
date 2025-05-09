
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! Trang bạn đang tìm kiếm không tồn tại.
        </p>
        <Button asChild>
          <Link to="/topics">Quay về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
