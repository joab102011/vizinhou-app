import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebase-admin';

interface Condominium {
  name: string;
  placeId: string;
  location: {
    lat: number;
    lng: number;
  };
  formatted_address: string;
  createdAt?: any;
  updatedAt?: any;
}

export async function POST(request: NextRequest) {
  try {
    const data: Condominium = await request.json();

    // Validar dados obrigatórios
    if (!data.name || !data.placeId || !data.location) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Adicionar timestamps
    const condominiumData = {
      ...data,
      createdAt: adminDb.FieldValue.serverTimestamp(),
      updatedAt: adminDb.FieldValue.serverTimestamp(),
    };

    // Salvar no Firestore
    const docRef = await adminDb.collection('condominiums').add(condominiumData);

    return NextResponse.json({
      id: docRef.id,
      ...condominiumData,
    });
  } catch (error) {
    console.error('Erro ao salvar condomínio:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar condomínio' },
      { status: 500 }
    );
  }
} 