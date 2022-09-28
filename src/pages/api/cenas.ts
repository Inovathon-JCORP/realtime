import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react';
// POST /api/post // Required fields in body: title // Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const session = await getSession({ req });
  // if (session) {
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
      },
    },
  });

  const scenes = result?.flatMap(({ TB_CENA }) => TB_CENA);

  const updatedData = JSON.stringify(scenes, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value,
  );

  res.json(JSON.parse(updatedData).length);
  // } else {
  //   res.status(401).send({ message: 'Unauthorized' });
  // }
}
