
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/topics" className="flex items-center">
          <span className="text-2xl font-bold text-gradient">VocaBoost</span>
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm font-medium hidden sm:inline">
                Xin chào, {user.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
