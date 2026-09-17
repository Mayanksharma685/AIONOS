export class EmployeeRequest {
  constructor(
    public readonly id: string,
    public readonly employee: string,
    public readonly email: string,
    public readonly dateOpened: string,
    public readonly request: string,
    public readonly initialAction: string
  ) {}
}
