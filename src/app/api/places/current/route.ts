import { NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE_ID = 'ChIJYbbjgQZVqwcRtVA4AAKysCU'; // Condomínio Clube Parque do Planalto

export async function GET() {
  if (!GOOGLE_MAPS_API_KEY) {
    return NextResponse.json(
      { error: 'Chave da API do Google Maps não configurada' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&key=${GOOGLE_MAPS_API_KEY}&language=pt-BR&fields=name,formatted_address,geometry`,
      { next: { revalidate: 3600 } } // Cache por 1 hora
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do local');
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.result) {
      throw new Error('Local não encontrado');
    }

    // Formata o endereço para português
    let formattedAddress = data.result.formatted_address
      .replace('State of São Paulo', 'São Paulo')
      .replace(', Brazil', '');

    return NextResponse.json({
      name: data.result.name,
      formatted_address: formattedAddress,
      geometry: data.result.geometry
    });
  } catch (error) {
    console.error('Erro ao buscar detalhes do local:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar detalhes do local' },
      { status: 500 }
    );
  }
} 