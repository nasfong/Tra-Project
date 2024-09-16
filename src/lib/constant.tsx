const imageUrl = import.meta.env.VITE_API_URL + '/image/'

const stock = [
  { id: 1, name: "In Stock" },
  { id: 2, name: "Out Stock" },
]
const status = {
  Draft: 1,
  Approved: 2,
  Trash: 3,
} as const

export const Constant = {
  imageUrl,
  stock,
  status,
};