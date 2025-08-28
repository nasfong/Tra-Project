const API_URL = window.__ENV__?.VITE_API_URL || "http://localhost:5000/api";

const imageUrl = API_URL + '/image/'

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
  API_URL
};