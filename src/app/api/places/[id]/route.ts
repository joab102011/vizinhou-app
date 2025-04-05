import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE_ID = 'ChIJYbbjgQZVqwcRtVA4AAKysCU'; // Place ID correto do Condomínio Clube Parque do Planalto

export async function GET(request: NextRequest) {
  try {
    // Adiciona cache para melhor performance
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,formatted_address,geometry&key=${GOOGLE_MAPS_API_KEY}`,
      { next: { revalidate: 3600 } } // Cache por 1 hora
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do local');
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error('Local não encontrado');
    }

    // Formata o endereço para português
    const formattedAddress = data.result.formatted_address
      .replace('State of Rio Grande do Norte', 'Rio Grande do Norte')
      .replace(', Brazil', ', Brasil');

    return NextResponse.json({
      name: 'Condomínio Clube Parque do Planalto',
      formatted_address: formattedAddress,
      geometry: data.result.geometry,
    });
  } catch (error) {
    console.error('Erro na API de lugares:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar detalhes do local' },
      { status: 500 }
    );
  }
} 