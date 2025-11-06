import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sprout,
  Beef,
  Package,
  DollarSign
} from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden shadow-card">
        <img
          src={farmHero}
          alt="Farm Management"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Welcome to AgriBliss</h1>
            <p className="text-xl opacity-90">Your complete farm management solution</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => navigate("/crops")} className="p-4 rounded-lg bg-gradient-primary text-white text-center hover:scale-105 transition-transform() cursor-pointer">
                <Sprout className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">Add Crop</p>
              </div>
              <div onClick={() => navigate("/livestock")} className="p-4 rounded-lg bg-gradient-nature text-white text-center hover:scale-105 transition-transform cursor-pointer">
                <Beef className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">Record Animal</p>
              </div>
              <div onClick={() => navigate("/inventory")} className="p-4 rounded-lg bg-gradient-earth text-white text-center hover:scale-105 transition-transform cursor-pointer">
                <Package className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">Update Inventory</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}