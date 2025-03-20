"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TravelerTable } from "../_components/traveler_table";
import { TravelerFilters } from "../_components/traveler_filters";
import { TravelerDialog } from "../_components/traveler_dialog";
import { Company, Traveler } from "@/app/_types";

export function TravelersPage({
  empresas,
  viajeros,
}: {
  empresas: Company[];
  viajeros: Traveler[];
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <Card>
        <div className="p-6 space-y-4">
          <TravelerFilters onCreateClick={() => setIsDialogOpen(true)} />
          <TravelerTable viajeros={viajeros} />
        </div>
      </Card>

      <TravelerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        empresas={empresas}
      />
    </div>
  );
}
