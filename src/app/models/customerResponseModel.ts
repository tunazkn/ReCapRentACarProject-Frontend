import { Customer } from "./customer";
import { CustomerDetailDto } from "./customerDetailDto";
import { ResponseModel } from "./responseModel";

export interface CustomerResponseModel extends ResponseModel{
    data:CustomerDetailDto[]
}