import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */

export function load({ params }) {
  if (params.slug) {
    return {
      subHeading: "NUTRITION",
      title: "Wet vs. Dry Cat Food",
      image: "/cat.png",
      content:
        "When it comes to cat food, there are so many options. Loving cat owners must choose from a variety of different flavors, decide between wet and dry, among many other considerations.If you’ve wondered which is better when it comes to wet vs. dry cat food, they’re both excellent choices. Just make sure the food you select is 100 percent complete and balanced for your cat’s age and life stage. While some cats (and cat owners) prefer one over the other, the best option may be to feed your cat both. You’re probably familiar with the wet food in cans, but you may also find it in pouches. Both “come in small sizes, making it easy to provide a variety of different flavors, and for some, smaller sizes may make portion control easier,” says Purina Veterinary Nutritionist Dr. Dorothy Laflamme.",
    };
  }

  throw error(404, "Not found");
}
