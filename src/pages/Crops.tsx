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
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import FormBuilder, { fieldDetail } from "@/components/Builder/form.Builder";
import { ICrop } from "@/Types/crop.types";
import { cropApi } from "@/apis/crops";
import { alertService } from "@/Services/alert.Service";

export default function Crops() {
  const [crops, setCrops] = useState<ICrop[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm()
  const count = new CropCounter(crops);
  const unitHolder: [{ label: string, value: string }] = [{ label: "fghgf", value: "ghgf" }];

  async function getCrops() {
    const response = await cropApi.getCrops();
    setCrops(response.Crops)
  }

  const newCropFields: fieldDetail[] = [
    {
      fieldLabel: "Crop name",
      fieldName: "name",
      fieldPlaceHolder: "Enter crop name",
      required: true
    },
    {
      fieldLabel: "Crop variety",
      fieldName: "variety",
      fieldPlaceHolder: "Enter crop variety",
      inputType: "text",
      required: true
    },
    {
      fieldLabel: "Area of land utilized in acres",
      fieldName: "area",
      fieldPlaceHolder: "Enter area in acres",
      inputType: "number",
      cutomRules: { max: 999, min: 1 },
      required: true
    },
    {
      fieldLabel: "Area measurement unit",
      fieldName: "areaUnit",
      fieldPlaceHolder: "Choose area measurement unit",
      fieldType: "select",
      options: () => { return [...unitHolder] },
      required: true
    },
    {
      fieldLabel: "Crop status",
      fieldName: "cropStatus",
      fieldPlaceHolder: "Choose crop status",
      fieldType: "select",
      options: () => {
        return [
          { label: "Active", value: "active" },
          { label: "Ready To Harvest", value: "ready_to_harvest" },
          { label: "Harvested", value: "harvested" }
        ]
      },
      required: true
    },
    {
      fieldLabel: "Planting date",
      fieldName: "plantingDate",
      fieldPlaceHolder: "Choose your planting date",
      inputType: "date",
      required: true
    },
    {
      fieldLabel: "Expected harvest date",
      fieldName: "expectedHarvestDate",
      fieldPlaceHolder: "Choose your expected harvest date",
      inputType: "date",
      required: true
    },
  ]

  const handleCreateCrop = async (Crop: ICrop) => {
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
          <DialogContent>
            <DialogTitle>
              <h1>Add New Crop</h1>
            </DialogTitle>
            <FormBuilder fields={newCropFields} buttonText={"Add New Crop"} onSubmit={(values: ICrop) => handleCreateCrop(values)} />
          </DialogContent>
          <DialogClose />
        </Dialog>
      </div>

      <Button className="bg-gradient-primary hover:bg-primary/90" onClick={() => setIsOpen(!isOpen)}>
        <Plus className="h-4 w-4 mr-2" />
        Add New Crop
      </Button>

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
    </div>
  );
}