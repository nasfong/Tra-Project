const stock = [
  { id: 1, name: "In Stock" },
  { id: 2, name: "Out Stock" },
]
const imageUrl = import.meta.env.VITE_API_URL + '/image/'

export const Constant = {
  stock,
  imageUrl,
};