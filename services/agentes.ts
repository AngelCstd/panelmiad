import { TypeFilters } from "@/types";
import { API_KEY, URL } from "../constant";

export const fetchAgentes = async (
  filters: TypeFilters,
  defaultFilters: TypeFilters,
  callback: (data: Agente[]) => void
) => {
  const queryParams = new URLSearchParams();

  Object.entries({ ...filters, ...defaultFilters }).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  const response = await fetch(
    `${URL}/mia/agentes/all?${queryParams.toString()}`,
    {
      headers: {
        "x-api-key": API_KEY,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Error al cargar los datos");
  }
  const data = await response.json();
  callback(data);
  return data;
};
export const fetchAgenteById = async (id) => {
  const cleanId = id.split("?")[0];
  const response = await fetch(`${URL}/mia/agentes/id?id=${cleanId}`, {
    headers: {
      "x-api-key": API_KEY,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Error al cargar los datos");
  }
  const data = await response.json();
  console.log(data);
  return data[0];
};
export const fetchEmpresasByAgente = async (id) => {
  try {
    const response = await fetch(`${URL}/mia/empresas/agente?id=${id}`, {
      headers: {
        "x-api-key": API_KEY,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Error al cargar los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// API functions
export const fetchViajerosByAgente = async (id: string) => {
  try {
    const response = await fetch(`${URL}/mia/viajeros/agente?id=${id}`, {
      headers: {
        "x-api-key": API_KEY,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Error al cargar los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
