import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sprout,
  Calendar,
  Plus,
  MapPin,
  Check
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate, CropCounter } from "@/Globals/global";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { ICrop } from "@/Types/crop.types";
import { cropApi } from "@/apis/crops";
import { alertService } from "@/Services/alert.Service";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Crops() {
  const [crops, setCrops] = useState<ICrop[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      variety: "",
      area: 0,
      areaUnit: "acre",
      cropStatus: "",
      plantingDate: "",
      expectedHarvestDate: ""
    }
  })
  const count = new CropCounter(crops);
  const unitHolder: [{ label: string, value: string }] = [{ label: "fghgf", value: "ghgf" }];

  async function getCrops() {
    const response = await cropApi.getCrops();
    setCrops(response.Crops)
  }

  const handleCreateCrop = async (Crop) => {
    try {
      const response = await cropApi.createCrop(Crop)
      if (!response.Success) {
        return alertService.show("Error", response.Message, "destructive")
      }
      form.reset();
      setIsOpen(false)
      return alertService.show("Success!", response.Message)

    } catch (error) {
      throw Error(error)
    } finally {
      getCrops();
    }
  }

  useEffect(() => {
    getCrops();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Crop Management</h1>
          <p className="text-muted-foreground">Monitor your crops' health, growth stages, and yields</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add crop
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              <h1>Add New Crop</h1>
            </DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateCrop)} className="space-y-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter crop name"  {...field} />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="variety" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop variety</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter crop variety"  {...field} />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="area" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area of land utilized in acres</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter area in acres"  {...field} />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="cropStatus" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose the crop's current status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="active" value="active">Active</SelectItem>
                          <SelectItem key="ready_to_harvest" value="ready_to_harvest">Ready to harvest</SelectItem>
                          <SelectItem key="harvested" value="harvested">Harvested</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="plantingDate" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Planting date</FormLabel>
                    <FormControl>
                      <DatePicker value={field.value} onChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="expectedHarvestDate" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected harvest date</FormLabel>
                    <FormControl>
                      <DatePicker value={field.value} onChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )} />
                <Button type="submit">Save</Button>
              </form>
            </Form>
          </DialogContent>
          <DialogClose />
        </Dialog>
      </div>

      {/* Crop Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <Sprout className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{count.getActiveCropsCount()}</p>
                <p className="text-sm text-muted-foreground">Active Crops</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{count.getTotalLandUsed()}</p>
                <p className="text-sm text-muted-foreground">Total Acres</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{count.getHarvestedCrops()}</p>
                <p className="text-sm text-muted-foreground">Harvested Crops</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{count.getReadyToHarvestCrops()}</p>
                <p className="text-sm text-muted-foreground">Ready to Harvest</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <Card key={crop._id} className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{crop.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{crop.variety}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{crop.area > 1 ? `${crop.area} ${crop.areaUnit}s` : `${crop.area} ${crop.areaUnit}`}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Planted:</span>
                  <span>{formatDate(crop.plantingDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Harvest:</span>
                  <span>{formatDate(crop.expectedHarvestDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={crop.irrigationStatus === "Active" ? "default" : "secondary"} className="text-xs">
                    {crop.cropStatus === "ready_to_harvest" ? "Ready to harvest" : crop.cropStatus === "active" ? "Active" : crop.cropStatus === "harvested" ? "Harvested" : ""}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {crops.length <= 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <img
            src="/empty_box.png"
            alt="No items"
            className="w-52 h-auto opacity-80 mb-6"
          />
          <h1 className="text-xl font-semibold text-muted-foreground">
            No crops to show yet
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Crops you add will appear here.
          </p>
        </div>
      )}
    </div>
  );
}