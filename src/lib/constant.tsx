const API_URL = window.__ENV__?.VITE_API_URL || import.meta.env.VITE_API_URL;

const imageUrl = window.__ENV__?.VITE_IMAGE_URL || import.meta.env.VITE_IMAGE_URL

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