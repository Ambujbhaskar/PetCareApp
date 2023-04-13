export async function load({ parent, params }) {
  const { lostPets } = await parent();

  const lostP = lostPets.find((lostPet) => lostPet.id === params.slug);

  return { lostPets: lostP };
}
