import { EnumBrandStatus } from '../../types-and-enums/enums'
import { IProductRecord } from '../types'

export const brands: Omit<IProductRecord, 'id'>[] = [
  {
    name: 'Drucker',
    productCode: 'DR21',
    brandId: 1,
    description: 'Drucker',
    price: 200,
    stockQuantity: 90,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/60/800/600'
  },
  {
    name: 'Webcam',
    productCode: 'WC22',
    brandId: 2,
    description: 'Webcam',
    price: 150,
    stockQuantity: 230,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/70/800/600'
  },
  {
    name: 'Tastatur',
    productCode: 'TK23',
    brandId: 3,
    description: 'Tastatur',
    price: 120,
    stockQuantity: 280,
    status: EnumBrandStatus.INACTIVE,
    imageUrl: 'https://picsum.photos/id/80/800/600'
  },
  {
    name: 'Maus',
    productCode: 'MS24',
    brandId: 4,
    description: 'Maus',
    price: 80,
    stockQuantity: 340,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/90/800/600'
  },
  {
    name: 'USB-C Hub',
    productCode: 'UH25',
    brandId: 5,
    description: 'USB-C Hub',
    price: 60,
    stockQuantity: 420,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/100/800/600'
  },
  {
    name: 'Externe SSD',
    productCode: 'SS26',
    brandId: 1,
    description: 'Externe SSD',
    price: 120,
    stockQuantity: 160,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/110/800/600'
  },
  {
    name: 'Netzteil',
    productCode: 'NT27',
    brandId: 2,
    description: 'Netzteil',
    price: 110,
    stockQuantity: 85,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/120/800/600'
  },
  {
    name: 'CPU Kühler',
    productCode: 'CK28',
    brandId: 3,
    description: 'CPU Kühler',
    price: 130,
    stockQuantity: 70,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/130/800/600'
  },
  {
    name: 'PC Gehäuse',
    productCode: 'PG29',
    brandId: 4,
    description: 'PC Gehäuse',
    price: 90,
    stockQuantity: 110,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/140/800/600'
  },
  {
    name: 'Motherboard',
    productCode: 'MB30',
    brandId: 5,
    description: 'Motherboard',
    price: 300,
    stockQuantity: 60,
    status: EnumBrandStatus.INACTIVE,
    imageUrl: 'https://picsum.photos/id/150/800/600'
  },
  {
    name: 'RAM Kit',
    productCode: 'RK31',
    brandId: 1,
    description: 'RAM Kit',
    price: 180,
    stockQuantity: 140,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/160/800/600'
  },
  {
    name: 'Grafikkarte',
    productCode: 'GK32',
    brandId: 2,
    description: 'Grafikkarte',
    price: 900,
    stockQuantity: 45,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/170/800/600'
  },
  {
    name: 'CPU',
    productCode: 'CP33',
    brandId: 3,
    description: 'CPU',
    price: 600,
    stockQuantity: 75,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/190/800/600'
  },
  {
    name: 'Küchenwaage',
    productCode: 'KW34',
    brandId: 4,
    description: 'Küchenwaage',
    price: 25,
    stockQuantity: 500,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/200/800/600'
  },
  {
    name: 'Schneidemaschine',
    productCode: 'SM35',
    brandId: 5,
    description: 'Schneidemaschine',
    price: 180,
    stockQuantity: 65,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/210/800/600'
  },
  {
    name: 'Entsafter',
    productCode: 'EJ36',
    brandId: 1,
    description: 'Entsafter',
    price: 220,
    stockQuantity: 95,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/220/800/600'
  },
  {
    name: 'Reiskocher',
    productCode: 'RK37',
    brandId: 2,
    description: 'Reiskocher',
    price: 75,
    stockQuantity: 180,
    status: EnumBrandStatus.INACTIVE,
    imageUrl: 'https://picsum.photos/id/230/800/600'
  },
  {
    name: 'Heizlüfter',
    productCode: 'HL38',
    brandId: 3,
    description: 'Heizlüfter',
    price: 50,
    stockQuantity: 320,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/240/800/600'
  },
  {
    name: 'Luftbefeuchter',
    productCode: 'LB39',
    brandId: 4,
    description: 'Luftbefeuchter',
    price: 70,
    stockQuantity: 150,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/250/800/600'
  },
  {
    name: 'Luftreiniger',
    productCode: 'LR40',
    brandId: 5,
    description: 'Luftreiniger',
    price: 300,
    stockQuantity: 80,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/260/800/600'
  },
  {
    name: 'Stickmixer',
    productCode: 'SB41',
    brandId: 1,
    description: 'Stickmixer',
    price: 60,
    stockQuantity: 240,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/270/800/600'
  },
  {
    name: 'Elektrische Zahnbürste',
    productCode: 'EZ42',
    brandId: 2,
    description: 'Elektrische Zahnbürste',
    price: 100,
    stockQuantity: 350,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/280/800/600'
  },
  {
    name: 'Haartrockner',
    productCode: 'HT43',
    brandId: 3,
    description: 'Haartrockner',
    price: 65,
    stockQuantity: 210,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/290/800/600'
  },
  {
    name: 'Glätteisen',
    productCode: 'GI44',
    brandId: 4,
    description: 'Glätteisen',
    price: 85,
    stockQuantity: 170,
    status: EnumBrandStatus.INACTIVE,
    imageUrl: 'https://picsum.photos/id/300/800/600'
  },
  {
    name: 'Lockenstab',
    productCode: 'LS45',
    brandId: 5,
    description: 'Lockenstab',
    price: 75,
    stockQuantity: 130,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/310/800/600'
  },
  {
    name: 'Rasierer',
    productCode: 'RR46',
    brandId: 1,
    description: 'Rasierer',
    price: 120,
    stockQuantity: 195,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/320/800/600'
  },
  {
    name: 'Smart Home Hub',
    productCode: 'SH49',
    brandId: 4,
    description: 'Smart Home Hub',
    price: 150,
    stockQuantity: 85,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/340/800/600'
  },
  {
    name: 'Smart Glühbirne',
    productCode: 'SG50',
    brandId: 5,
    description: 'Smart Glühbirne',
    price: 25,
    stockQuantity: 600,
    status: EnumBrandStatus.ACTIVE,
    imageUrl: 'https://picsum.photos/id/350/800/600'
  }

];
