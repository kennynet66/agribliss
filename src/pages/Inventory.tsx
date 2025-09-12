import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Plus,
  Wrench,
  Wheat
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import apiClient from "@/Utilities/api.Utility";

export default function Inventory() {
  const form = useForm();
  const [inventory, setInventory] = useState([]);
  
  const getInventoryItems = async () => {
    try {
      const inventoryItems = await apiClient.get("/inventory/getinventoryitems");
      setInventory(inventoryItems.data.Items);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getInventoryItems()
  }, []);

  const getStockStatus = (current: number, min: number) => {
    const percentage = (current / min) * 100;
    if (percentage <= 100) return { status: "Low", color: "text-destructive", bg: "bg-destructive/10" };
    if (percentage <= 200) return { status: "Medium", color: "text-warning", bg: "bg-warning/10" };
    return { status: "Good", color: "text-success", bg: "bg-success/10" };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Equipment": return Wrench;
      case "Seeds": return Wheat;
      case "Produce": return Package;
      default: return Package;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Manage supplies, equipment, and produce</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              <h1>Add Item</h1>
            </DialogTitle>
            <Form {...form}>
              <FormField name="itemName" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the item name" {...field} />
                  </FormControl>
                </FormItem>
              )} />
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Inventory Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">248</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Equipment Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">$125K</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {inventory.map((item) => {
          const stockStatus = getStockStatus(item.itemsInStock, 10);
          const stockPercentage = Math.min((item.itemsInStock / 10) * 100, 100);
          const IconComponent = getCategoryIcon(item.category);

          return (
            <Card key={item.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                  <Badge className={`${stockStatus.bg} ${stockStatus.color} border-0`}>
                    {stockStatus.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current Stock:</p>
                    <p className="font-medium">{item.currentStock} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Value:</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location:</p>
                    <p className="font-medium">{item.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min Stock:</p>
                    <p className="font-medium">{item.minStock} {item.unit}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Stock Level</span>
                    <span className="text-sm text-muted-foreground">{stockPercentage.toFixed(0)}% of capacity</span>
                  </div>
                  <Progress value={stockPercentage} className="h-2" />
                </div>

                <div className="space-y-2 text-sm">
                  {item.lastRestocked && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Restocked:</span>
                      <span>{item.lastRestocked}</span>
                    </div>
                  )}
                  {item.lastMaintenance && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Maintenance:</span>
                      <span>{item.lastMaintenance}</span>
                    </div>
                  )}
                  {item.harvestDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Harvest Date:</span>
                      <span>{item.harvestDate}</span>
                    </div>
                  )}
                  {item.supplier && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Supplier:</span>
                      <span>{item.supplier}</span>
                    </div>
                  )}
                  {item.condition && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition:</span>
                      <Badge variant="secondary" className="text-xs">{item.condition}</Badge>
                    </div>
                  )}
                  {item.quality && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quality:</span>
                      <Badge variant="secondary" className="text-xs">{item.quality}</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}