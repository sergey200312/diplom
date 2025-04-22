import { IEmployee } from "./employee"

export interface IBrigade {
    id: string
    name: string
    Employees: IEmployee[]
}