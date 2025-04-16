import { Suspense } from "react";
import { TravelersPage } from "./_components/traveler_main";
import { API_KEY } from "../../constants/constantes";

export default async function TravelerDashboard() {
  const endpoint = "https://mianoktos.vercel.app/v1/mia/agentes/agentes";
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY || "",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
      cache: "no-store", // Este campo es útil en el navegador, pero puedes dejarlo
    });

    const data = await response.json();

    // Verifica si data tiene error (dependiendo de cómo responda tu API)
    if (Array.isArray(data) && (data[0]?.error || data[1]?.error)) {
      throw new Error("Error al cargar los datos");
    }
    const agentes = data.data.users;

    return (
      <Suspense fallback={<h1>Cargando...</h1>}>
        <TravelersPage agentes={agentes || []}></TravelersPage>
      </Suspense>
    );
    // return <h1>Estamos en mantenimiento...</h1>;
  } catch (error) {
    console.log("Error al cargar los datos en agentes:", error);
    console.log(error);
    return <h1>Error al cargar los datos :c</h1>;
  }
}
