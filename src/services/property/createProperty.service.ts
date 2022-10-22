import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../Error/AppError";
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({address, categoryId, size, value}:IPropertyRequest) => {
  const { city, district, state, zipCode, number }: IAddressRequest = address;

  const propertyRepository = AppDataSource.getRepository(Properties);
  const addressRepository = AppDataSource.getRepository(Addresses);
  const categoryRepository = AppDataSource.getRepository(Categories)

  if(state.length > 2){
    throw new AppError('Campo state não pode ser maior que 2 digitos')
  }

  if(zipCode.length > 8){
    throw new AppError('O zip code não pode ser maior que 8 digitos')
  }

  const addressAlreadyExists = await addressRepository.findOneBy({
        city,
        district,
        state,
        zipCode,
        number
  })

  if(addressAlreadyExists){
    throw new AppError('Endereço ja cadastrado')
  }

  const registerAddress = addressRepository.create({
    city,
    district,
    state,
    number,
    zipCode
  })

  await addressRepository.save(registerAddress)

  const categories = await categoryRepository.find()
  const foundCategory = categories.find(category => category.id === categoryId)

  if(!foundCategory){
    throw new AppError('Categoria nao encontrada',404)
  }

   const registeredProperty =  propertyRepository.create({
    value,
    size,
    category: foundCategory,
    address: registerAddress
  })
  await propertyRepository.save(registeredProperty)

  return registeredProperty
};

export default createPropertyService;
