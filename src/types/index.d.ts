type Types = {
  id: string;
  name: string;
  order: number;
};

type Product = {
  id: string
  image: string[]
  name: string
  price: string
  description: string
  type: Type
  isNews: boolean;
  isSold: 1 | 2;
  recommend: boolean;
  star: number
}

type Customer = {
  id: string
  image: string
  name: string
  phone: string
  product: Product
  status: 1 | 2 | 3
  createdAt: string
  updatedAt: string
}

type CustomerList = {
  data: Customer[]
  pagination: {
    total: number
    totalPages: number
    currentPage: number
    limit: number
  }
}
