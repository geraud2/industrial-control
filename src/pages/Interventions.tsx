import { ClipboardList, Camera, MessageSquare, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const interventions = [
  { id: 1, title: "Réparation climatisation", site: "Paris Centre", tech: "J. Martin", date: "23/02/2026", status: "En cours", comment: "Compresseur à remplacer. Pièce commandée.", hasPhoto: true },
  { id: 2, title: "Maintenance groupe électrogène", site: "Lyon Part-Dieu", tech: "A. Dupont", date: "22/02/2026", status: "En cours", comment: "Vidange et remplacement filtres en cours.", hasPhoto: false },
  { id: 3, title: "Inspection ascenseur", site: "Marseille", tech: "M. Bernard", date: "22/02/2026", status: "Terminée", comment: "RAS. Conformité validée.", hasPhoto: true },
  { id: 4, title: "Réparation compresseur", site: "Lille Europe", tech: "A. Dupont", date: "21/02/2026", status: "Terminée", comment: "Remplacement vanne + joints. Test OK.", hasPhoto: true },
  { id: 5, title: "Maintenance préventive chaudière", site: "Lyon Part-Dieu", tech: "S. Petit", date: "20/02/2026", status: "Terminée", comment: "Nettoyage brûleur, contrôle sécurité.", hasPhoto: false },
  { id: 6, title: "Calibration capteurs", site: "Nantes", tech: "J. Martin", date: "19/02/2026", status: "Terminée", comment: "Tous les capteurs recalibrés. Valeurs conformes.", hasPhoto: false },
];

const statusStyle: Record<string, string> = {
  "En cours": "bg-warning text-warning-foreground",
  "Terminée": "bg-success text-success-foreground",
};

const Interventions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Interventions</h1>
        <p className="text-sm text-muted-foreground">Suivi des missions techniciens</p>
      </div>

      <div className="grid gap-4">
        {interventions.map((i) => (
          <Card key={i.id}>
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{i.title}</h3>
                    <Badge className={statusStyle[i.status]}>{i.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{i.site} — {i.tech} — {i.date}</p>
                  <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{i.comment}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {i.hasPhoto && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Camera className="h-4 w-4" /> Photo
                    </div>
                  )}
                  {i.status === "En cours" && (
                    <Button size="sm" variant="outline" className="text-success border-success hover:bg-success/10">
                      <CheckCircle2 className="mr-1.5 h-4 w-4" /> Valider
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Interventions;
