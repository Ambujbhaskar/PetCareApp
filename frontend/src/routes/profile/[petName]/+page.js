export const load = ({params}) => {
	return {
		petName: params.petName,
		image: "/zarun.png",
		weight: "99 KG",
		bloodGroup: "A",
		notes: "Allergic to peanuts."
	};
}