import { DogFact } from "../types/DogFact";
import { DogImageResponse } from "../types/DogFactImage";

const SUPER_DOG_IMG_URL = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9cVPeoNDmeSG6w0z4glS8gHaHZ%26pid%3DApi&f=1&ipt=d1e612726bcf771b554c9cfced876b3d162c9970606eef49009361fc6ad45a34&ipo=images'


const getDogFact = async (): Promise<string> => {
  try {
    const response = await fetch('http://dog-api.kinduff.com/api/facts');
    const json: DogFact = await response.json();

    const fact = json.facts[0]
    return fact
  } catch (error) {
    console.error(error);
  }

  return 'Error de factos.'
}

const getDogImageUrl = async (): Promise<string> => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const json: DogImageResponse = await response.json();

    const imgUrl = json.message
    return imgUrl
  } catch (error) {
    console.error(error);
  }
  return SUPER_DOG_IMG_URL
}

export const dogService = {
  SUPER_DOG_IMG_URL,
  getDogFact,
  getDogImageUrl
}