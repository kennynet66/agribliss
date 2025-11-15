import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  AlertTriangle,
  Plus,
  Wrench,
  Wheat
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { inventoryApi } from "@/apis/inventoryapi";
import { TInventory } from "@/Types/inventoryTypes";
import FormBuilder, { fieldDetail } from "@/components/Builder/form.Builder";
import { alertService } from "@/Services/alert.Service";
import { MeasurementUnits } from "@/Types/globaltypes";

export default function Inventory() {
  const form = useForm();
  const category = form.watch("category");
  const [inventory, setInventory] = useState<TInventory[]>([]);
  const [lowStockItems, setLowStockItems] = useState<number>();
  const [totalInventoryItems, setTotalInventoryItems] = useState<number>();
  const [totalValue, setTotalValue] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const getInventoryItems = async () => {
    const response = await inventoryApi.getInventoryItems();
    setInventory(response.InventoryItems);
    setLowStockItems(response.lowStockItems);
    setTotalInventoryItems(response.totalInventoryItems);
    setTotalValue(response.totalValue);
  }
  const getUnitsByCategory = (category: string) => {
    switch (category) {
      case "seeds":
        return MeasurementUnits.WeightUnits;
      case "supplies":
        return MeasurementUnits.UnitCountUnits
      case "equipment":
        return MeasurementUnits.UnitCountUnits
      default:
        return [];
    }
  };

  useEffect(() => {
    getInventoryItems()
  }, []);

  const getStockStatus = (currentStock: number, minStock: number, maxStock: number) => {
    if (currentStock <= minStock) return { status: "Low", color: "text-destructive", bg: "bg-destructive/10" };
    if (currentStock <= (50 / 100) * maxStock) return { status: "Medium", color: "text-warning", bg: "bg-warning/10" };
    return { status: "Good", color: "text-success", bg: "bg-success/10" };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "equipment": return Wrench;
      case "seeds": return Wheat;
      case "supplies": return Package;
      default: return Package;
    }
  };

  const newInventoryItemFields: fieldDetail[] = [
    {
      fieldLabel: "Item name",
      fieldName: 'itemName',
      fieldPlaceHolder: "Enter item name",
      required: true
    },
    {
      fieldLabel: "Item category",
      fieldName: 'category',
      fieldPlaceHolder: "Choose the item's category",
      fieldType: "select",
      required: true,
      options: () => {
        return [
          { label: "Supplies", value: "supplies" },
          { label: "Equipment", value: "equipment" },
          { label: "Seeds", value: "seeds" }
        ]
      }
    },
    {
      fieldLabel: "Measurement unit",
      fieldName: 'unit',
      fieldPlaceHolder: "Choose the item's unit of measurement",
      fieldType: "select",
      required: true,
      options: () => {
        console.log("Called", category)
        return getUnitsByCategory(category || '').map((item) => ({
          label: item.key,
          value: item.value
        }))
      }
    },
    {
      fieldLabel: "Item purchase date",
      fieldName: 'purchaseDate',
      fieldPlaceHolder: "Choose item's purchase date",
      inputType: "date",
      required: true
    },
    {
      fieldLabel: "Item value",
      fieldName: 'value',
      inputType: "number",
      fieldPlaceHolder: "Enter item value",
      required: true
    },
    {
      fieldLabel: "Current stock",
      fieldName: 'currentStock',
      inputType: "number",
      fieldPlaceHolder: "Number of items in stock",
      required: true
    },
  ]

  const handleCreateInventoryItem = async (inventoryItem: TInventory) => {
    try {
      const response = await inventoryApi.createInventoryItem(inventoryItem);
      if (!response.Success) return alertService.show("Error", response.Message, "destructive");
      form.reset();
      setIsOpen(false)
    } catch (error) {
      throw Error(error);
    } finally {
      getInventoryItems();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Manage supplies, equipment, and produce</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <FormBuilder formInstance={form} fields={newInventoryItemFields} buttonText="Add Inventory Item" onSubmit={(values: TInventory) => handleCreateInventoryItem(values)} />
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
                <p className="text-2xl font-bold">{totalInventoryItems}</p>
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
                <p className="text-2xl font-bold">{lowStockItems}</p>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
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
                <p className="text-2xl font-bold">{totalValue}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {inventory.map((item) => {
          const stockStatus = getStockStatus(item.currentStock, item.minStock, item.maxStock);
          const stockPercentage = Math.min((item.currentStock * 100) / item.maxStock, 100);
          const IconComponent = getCategoryIcon(item.category);

          return (
            <Card key={item._id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.itemName}</CardTitle>
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
                    <p className="font-medium">{`${item.location.locationName} - ${item.location.locationDescription}`}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min Stock:</p>
                    <p className="font-medium">{item.minStock} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Max Stock:</p>
                    <p className="font-medium">{item.maxStock} {item.unit}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Stock Level</span>
                    <span className="text-sm text-muted-foreground">{stockPercentage.toFixed(0)}% of maximum capacity</span>
                  </div>
                  <Progress value={stockPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}