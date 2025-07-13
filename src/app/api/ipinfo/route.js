// src/app/api/ipinfo/route.js
export async function GET(req) {
  const token = process.env.IPINFO_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: 'No se encontró el token de IPInfo en las variables de entorno.' }), { status: 500 });
  }
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${token}`);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Error al obtener datos de ipinfo.io' }), { status: response.status });
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Fallo en el proxy: ' + error.message }), { status: 500 });
  }
}