export interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  size: number;
  imageUrl: string;
  type: string;
  propertyCode: string;
  description: string;
}

export interface NewProperty {
  name: string;
  location: string;
  price: number;
  size: number;
  imageUrl: string;
  type: string;
  description: string;
}

export interface EditProperty {
  id: number;
  name: string;
  location: string;
  price: number;
  size: number;
  imageUrl: string;
  type: string;
  description: string;
}

