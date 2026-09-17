import { employeeRequests } from "../data/employeeRequests.js";
import { EmployeeRequest } from "../models/EmployeeRequest.js";

export class RequestService {
  getAll(): EmployeeRequest[] {
    return employeeRequests;
  }

  getById(id: string): EmployeeRequest | undefined {
    return employeeRequests.find(request => request.id === id);
  }
}
