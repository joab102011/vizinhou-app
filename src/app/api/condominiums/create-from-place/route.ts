import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE_ID = 'ChIJYbbjgQZVqwcRtVA4AAKysCU'; // Parque do Planalto Condomínio Clube

export async function GET() {
  if (!GOOGLE_MAPS_API_KEY) {
    console.error('Chave da API do Google Maps não configurada');
    return NextResponse.json(
      { error: 'Chave da API do Google Maps não configurada' },
      { status: 500 }
    );
  }

  try {
    // Verificar se o Firebase Admin está inicializado corretamente
    if (!adminDb) {
      console.error('Firebase Admin não inicializado');
      return NextResponse.json(
        { error: 'Erro de configuração do servidor' },
        { status: 500 }
      );
    }

    console.log('Buscando detalhes do local na API do Google Places...');
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&key=${GOOGLE_MAPS_API_KEY}&language=pt-BR&fields=name,formatted_address,geometry`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      console.error('Erro na resposta da API:', response.status);
      throw new Error('Erro ao buscar detalhes do local');
    }

    const data = await response.json();
    console.log('Resposta da API:', data);

    if (data.status !== 'OK' || !data.result) {
      console.error('Status da API inválido:', data.status);
      throw new Error('Local não encontrado');
    }

    // Dados do condomínio
    const condominiumData = {
      name: 'Parque do Planalto Condomínio Clube',
      placeId: PLACE_ID,
      location: {
        lat: -5.8433474,
        lng: -35.259296
      },
      formatted_address: 'R. Acaraú, 205 - Nova Parnamirim, Parnamirim - RN, 59151-445',
      createdAt: adminDb.FieldValue.serverTimestamp(),
      updatedAt: adminDb.FieldValue.serverTimestamp(),
    };

    try {
      console.log('Verificando se o condomínio já existe...');
      // Verificar se já existe um condomínio com este placeId
      const existingDoc = await adminDb
        .collection('condominiums')
        .where('placeId', '==', PLACE_ID)
        .limit(1)
        .get();

      if (!existingDoc.empty) {
        console.log('Condomínio já existe, atualizando dados...');
        const docRef = existingDoc.docs[0].ref;
        await docRef.update({
          ...condominiumData,
          updatedAt: adminDb.FieldValue.serverTimestamp(),
        });

        return NextResponse.json({
          id: docRef.id,
          ...condominiumData,
          message: 'Condomínio atualizado com sucesso'
        });
      }

      console.log('Criando novo condomínio...');
      // Salvar no Firestore
      const docRef = await adminDb.collection('condominiums').add(condominiumData);
      console.log('Condomínio criado com sucesso:', docRef.id);

      return NextResponse.json({
        id: docRef.id,
        ...condominiumData,
        message: 'Condomínio criado com sucesso'
      });
    } catch (firestoreError) {
      console.error('Erro ao acessar o Firestore:', firestoreError);
      return NextResponse.json(
        { error: 'Erro ao acessar o banco de dados' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro ao criar/atualizar condomínio:', error);
    return NextResponse.json(
      { error: 'Erro ao criar/atualizar condomínio' },
      { status: 500 }
    );
  }
} 