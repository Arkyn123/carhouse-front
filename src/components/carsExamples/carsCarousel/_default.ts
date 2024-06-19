import { CarProps } from "../examples"
import RenoLoganImage from "./images/logan.jpeg"
import ChevroletAveoImage from "./images/aveo.jpeg"
import DaewooMatizImage from "./images/matiz.jpeg"
import HyundaiSonataImage from "./images/sonata.jpeg"
import HyuindaiSolarisImage from "./images/solaris.jpeg"
import FordFocusImage from "./images/focus.jpeg"


export const defaultCars: CarProps[] = [
    {
        name: "Reno Logan",
        price: "240 000",
        year: "2010",
        mileage: "190 000",
        image: RenoLoganImage
    },
    {
        name: "Chevrolet Aveo",
        price: "450 000",
        year: "2012",
        mileage: "142 000",
        image: ChevroletAveoImage
    },
    {
        name: "Daewoo Matiz",
        price: "80 000",
        year: "2007",
        mileage: "102 000",
        image: DaewooMatizImage
    },
    {
        name: "Hyundai Sonata",
        price: "280 000",
        year: "2006",
        mileage: "280 000",
        image: HyundaiSonataImage
    },
    {
        name: "Hyundai Solaris",
        price: "310 000",
        year: "2012",
        mileage: "310 000",
        image: HyuindaiSolarisImage
    },
    {
        name: "Ford Focus",
        price: "250 000",
        year: "2005",
        mileage: "240 000",
        image: FordFocusImage
    },
]