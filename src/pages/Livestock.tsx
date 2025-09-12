import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Beef, 
  Heart,
  Calendar,
  Plus,
  Stethoscope,
  Baby
} from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Livestock() {
  const animals = [
    {
      id: "COW-001",
      name: "Bessie",
      type: "Holstein Cow",
      age: "3 years",
      health: "Excellent",
      lastCheckup: "July 10, 2024",
      breeding: "Not Breeding",
      weight: "1,200 lbs",
      location: "Barn A, Stall 5",
      vaccinations: "Up to date"
    },
    {
      id: "COW-002", 
      name: "Daisy",
      type: "Jersey Cow",
      age: "5 years",
      health: "Good",
      lastCheckup: "July 8, 2024",
      breeding: "Pregnant - Due Sept 15",
      weight: "950 lbs",
      location: "Barn A, Stall 12",
      vaccinations: "Due in 2 weeks"
    },
    {
      id: "PIG-001",
      name: "Wilbur",
      type: "Yorkshire Pig",
      age: "2 years",
      health: "Fair",
      lastCheckup: "July 12, 2024",
      breeding: "Not Breeding",
      weight: "280 lbs",
      location: "Pig Pen 3",
      vaccinations: "Up to date"
    }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Excellent": return "text-success";
      case "Good": return "text-primary";
      case "Fair": return "text-warning";
      default: return "text-destructive";
    }
  };

  const getHealthBg = (health: string) => {
    switch (health) {
      case "Excellent": return "bg-success/10";
      case "Good": return "bg-primary/10";
      case "Fair": return "bg-warning/10";
      default: return "bg-destructive/10";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Livestock Management</h1>
          <p className="text-muted-foreground">Monitor animal health, breeding, and nutrition</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Animal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              <h1>Add new Animal</h1>
            </DialogTitle>
            <DialogDescription>
              <p>This is a description</p>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>

      {/* Livestock Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Beef className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">85</p>
                <p className="text-sm text-muted-foreground">Total Animals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <Heart className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">78</p>
                <p className="text-sm text-muted-foreground">Healthy Animals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Baby className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Pregnant Animals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Stethoscope className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-muted-foreground">Need Checkup</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <Card key={animal.id} className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{animal.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">ID: {animal.id}</p>
                </div>
                <Badge className={`${getHealthBg(animal.health)} ${getHealthColor(animal.health)} border-0`}>
                  {animal.health}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Type:</p>
                  <p className="font-medium">{animal.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Age:</p>
                  <p className="font-medium">{animal.age}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Weight:</p>
                  <p className="font-medium">{animal.weight}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location:</p>
                  <p className="font-medium">{animal.location}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Last Checkup:</span>
                  <span>{animal.lastCheckup}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Breeding Status:</span>
                  <Badge variant={animal.breeding.includes("Pregnant") ? "default" : "secondary"} className="text-xs">
                    {animal.breeding}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Vaccinations:</span>
                  <Badge variant={animal.vaccinations === "Up to date" ? "default" : "destructive"} className="text-xs">
                    {animal.vaccinations}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Stethoscope className="h-3 w-3 mr-1" />
                  Checkup
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="h-3 w-3 mr-1" />
                  Health
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}