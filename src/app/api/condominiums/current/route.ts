import { NextResponse } from 'next/server';

const CONDOMINIUM_DATA = {
  id: 'parque-do-planalto',
  name: 'Parque do Planalto Condomínio Clube',
  address: 'Rua Parque do Planalto, s/n - Parque do Planalto, Brasília - DF',
  placeId: 'ChIJYbbjgQZVqwcRtVA4AAKysCU',
  location: {
    lat: -15.8697,
    lng: -48.0249
  }
};

export async function GET() {
  return NextResponse.json(CONDOMINIUM_DATA);
} 