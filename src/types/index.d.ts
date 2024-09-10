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
