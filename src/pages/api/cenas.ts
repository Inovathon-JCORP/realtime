import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react';
// POST /api/post // Required fields in body: title // Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma?.tB_CAPITULO.findMany({
    where: {
      id_programa: 11099,
      st_ativo: true,
    },
    include: {
      TB_CENA: {
        where: {
          st_ativo: true,
        },
        orderBy: {
          id_numero: 'asc',
        },
        include: {
          TB_CENA_PERSONAGEM: true,
          TB_DUBLE_PERSONAGEM_CENA: true,
          TB_CENA_FIGURANTE: true,
          TB_CENA_TEXTO: {
            where: {
              st_ativo: true,
            },
            orderBy: {
              id_numero: 'asc',
            },
          },
        },
      },
    },
  });

  const scenes = result
    ?.flatMap(({ TB_CENA }) => TB_CENA)
    .map(
      ({
        TB_CENA_PERSONAGEM,
        TB_CENA_FIGURANTE,
        TB_CENA_TEXTO,
        TB_DUBLE_PERSONAGEM_CENA,
        ...scene
      }) => ({
        ...scene,
        personagens: TB_CENA_PERSONAGEM,
        dubles: TB_DUBLE_PERSONAGEM_CENA,
        figurantes: TB_CENA_FIGURANTE,
        elementosTexto: TB_CENA_TEXTO,
      }),
    );

  const updatedData = JSON.stringify(scenes, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value,
  );

  res.json(JSON.parse(updatedData));
}
