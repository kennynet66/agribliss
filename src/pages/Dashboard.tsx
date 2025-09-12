import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sprout, 
  Beef, 
  Package, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";

export default function Dashboard() {
  const stats = [
    { title: "Active Crops", value: "12", icon: Sprout, color: "text-success", bg: "bg-success/10" },
    { title: "Livestock", value: "85", icon: Beef, color: "text-primary", bg: "bg-primary/10" },
    { title: "Inventory Items", value: "248", icon: Package, color: "text-accent", bg: "bg-accent/10" },
    { title: "Monthly Revenue", value: "$24,580", icon: DollarSign, color: "text-success", bg: "bg-success/10" },
  ];

  const activities = [
    { action: "Corn harvest completed", time: "2 hours ago", status: "success" },
    { action: "Cattle vaccination scheduled", time: "4 hours ago", status: "warning" },
    { action: "New inventory received", time: "6 hours ago", status: "info" },
    { action: "Financial report generated", time: "1 day ago", status: "success" },
  ];

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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-4 w-4 mr-1 text-success" />
                +12% from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className={`p-1 rounded-full ${
                    activity.status === 'success' ? 'bg-success/20' :
                    activity.status === 'warning' ? 'bg-warning/20' : 'bg-primary/20'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : activity.status === 'warning' ? (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    ) : (
                      <Package className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gradient-primary text-white text-center hover:scale-105 transition-transform cursor-pointer">
                <Sprout className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">Add Crop</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-nature text-white text-center hover:scale-105 transition-transform cursor-pointer">
                <Beef className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">Record Animal</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-earth text-white text-center hover:scale-105 transition-transform cursor-pointer">
                <Package className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">Update Inventory</p>
              </div>
              <div className="p-4 rounded-lg bg-accent text-accent-foreground text-center hover:scale-105 transition-transform cursor-pointer">
                <DollarSign className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">Add Expense</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}