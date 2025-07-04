"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User, PencilIcon, Save, CreditCard } from "lucide-react";
import { createNewEmpresa, updateViajero } from "@/hooks/useDatabase";
import { formatDate } from "@/helpers/utils";
import {
  CheckboxInput,
  DateInput,
  Dropdown,
  NumberInput,
  TextAreaInput,
  TextInput,
} from "@/components/atom/Input";

export function AgentDetailsCard({ agente }: { agente: Agente }) {
  const [form, setForm] = useState({
    numero_empleado: agente.numero_empleado || "",
    vendedor: agente.vendedor || "",
    notas: agente.notas || "",
    numero_pasaporte: agente.numero_pasaporte || "",
    telefono: Number(agente.telefono) || null,
    fecha_nacimiento: agente.fecha_nacimiento
      ? agente.fecha_nacimiento.split("T")[0]
      : "",
    nacionalidad: agente.nacionalidad || "",
    tiene_credito_consolidado: Boolean(agente.tiene_credito_consolidado),
    monto_credito: Number(agente.monto_credito) || null,
  });

  // const handleSave = async () => {
  //   try {
  //     const responseCompany = await updateViajero(
  //       agente,
  //       agente.empresas.map((company) => company.id_empresa),
  //       agente.id_viajero
  //     );
  //     if (!responseCompany.success) {
  //       throw new Error("No se pudo actualizar al viajero");
  //     }
  //     console.log(responseCompany);
  //   } catch (error) {
  //     console.error("Error actualizando viajero", error);
  //   }
  // };

  return (
    <Card className="w-full mx-auto border-none shadow-none hover:shadow-none">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <CardTitle className="text-xl font-bold">Detalles del Agente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Información Personal */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center w-full lg:flex-row gap-4 justify-between mb-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="gap-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    {agente.nombre_agente_completo.toUpperCase()}
                  </h2>
                  <p className="text-xs text-gray-500">
                    ID: {agente.id_agente}
                  </p>
                  <p className="text-xs text-gray-500">{agente.correo}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <CheckboxInput
                checked={form.tiene_credito_consolidado}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    tiene_credito_consolidado: value,
                  }))
                }
                label="Activar credito"
              />
              <NumberInput
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, monto_credito: Number(value) }))
                }
                disabled={!form.tiene_credito_consolidado}
                label="Credito aprobado"
                value={form.monto_credito}
                placeholder="5535..."
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextInput
              onChange={(value) =>
                setForm((prev) => ({ ...prev, vendedor: value }))
              }
              label="Vendedor"
              value={form.vendedor}
              placeholder=""
            />
            <NumberInput
              onChange={(value) =>
                setForm((prev) => ({ ...prev, telefono: Number(value) }))
              }
              label="Numero de telefono"
              value={form.telefono}
              placeholder="5535..."
            />
            <DateInput
              onChange={(value) =>
                setForm((prev) => ({ ...prev, fecha_nacimiento: value }))
              }
              label="Fecha de nacimiento"
              value={form.fecha_nacimiento}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            Datos extra del cliente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
            <TextInput
              onChange={(value) =>
                setForm((prev) => ({ ...prev, numero_empleado: value }))
              }
              label="Numero de empleado"
              value={form.numero_empleado}
              placeholder=""
            />
            <TextInput
              onChange={(value) =>
                setForm((prev) => ({ ...prev, numero_pasaporte: value }))
              }
              label="Numero de pasaporte"
              value={form.numero_pasaporte}
              placeholder=""
            />
            <Dropdown
              label="Nacionalidad"
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  estado_reserva: value,
                }));
              }}
              options={[
                "MX",
                "US",
                "CA",
                "ES",
                "AR",
                "BR",
                "FR",
                "DE",
                "IT",
                "JP",
                "CN",
                "IN",
                "UK",
                "AU",
                "CL",
              ]}
              value={form.nacionalidad}
            />
          </div>
          <TextAreaInput
            onChange={(value) => setForm((prev) => ({ ...prev, notas: value }))}
            label="Notas"
            value={form.notas}
            placeholder=""
          />
        </div>

        {/* Empresas Asociadas */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" />
            Empresas Asociadas ({agente.empresas.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {agente.empresas.map((company) => (
              <div
                key={company.id_empresa}
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Building2 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">{company.razon_social}</div>
                  <div className="text-xs text-gray-500">
                    ID: {company.id_empresa}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fecha de Registro */}
        <div className="text-sm text-gray-500 pt-4 border-t flex justify-between">
          <p>Fecha de registro: {formatDate(agente.created_at)}</p>
          <button className="inline-flex items-center px-4 py-2 border border-sky-100 bg-sky-600 shadow-md text-sm font-medium rounded-md text-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2">
            <Save className="w-4 h-4 mr-2" /> Guardar
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
