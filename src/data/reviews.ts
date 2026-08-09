export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  product: string;
  image?: string;
  verified: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: "1", name: "Ahmed R.", location: "Lahore", rating: 5, date: "2 weeks ago",
    text: "Ordered ST27 seat covers for my Corolla 2022. Perfect fit, premium quality leather. Highly recommended!",
    product: "Premium Leather Seat Covers",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=80",
    verified: true,
  },
  {
    id: "2", name: "Sana K.", location: "Karachi", rating: 5, date: "1 month ago",
    text: "Best 7D mats I've ever bought. They fit my Civic perfectly. Cash on delivery made it so easy.",
    product: "7D Floor Mats Premium",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&q=80",
    verified: true,
  },
  {
    id: "3", name: "Usman M.", location: "Islamabad", rating: 4, date: "3 weeks ago",
    text: "LED projector lights transformed my night driving. Great value for money.",
    product: "LED Headlight Projector", verified: true,
  },
  {
    id: "4", name: "Fatima A.", location: "Faisalabad", rating: 5, date: "1 week ago",
    text: "Got the combo deal — seat covers and floor mats together. Saved a lot. WhatsApp support was very responsive.",
    product: "Seat Cover + Floor Mat Combo",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=200&q=80",
    verified: true,
  },
  {
    id: "5", name: "Bilal H.", location: "Multan", rating: 5, date: "2 months ago",
    text: "Japanese scratchless material seat covers for my Fortuner. Worth every rupee.",
    product: "Premium Leather Seat Covers", verified: true,
  },
  {
    id: "6", name: "Zainab T.", location: "Rawalpindi", rating: 5, date: "5 days ago",
    text: "Ambient LED lights look incredible. Easy to install and fast delivery.",
    product: "Ambient Interior LED Lights",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200&q=80",
    verified: true,
  },
];
