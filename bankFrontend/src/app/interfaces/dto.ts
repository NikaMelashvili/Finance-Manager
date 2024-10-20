export interface Dto {
    id:number,
    
    email:string,
    password:string,
    
    image:string,

    name:string,
    surname:string,

    balance:number,
    income:number,
    expenses:{
        family:number,
        cashout:number,
        transfer:number,
        health:number,
        restaurants:number,
        shopping:number,
        transport:number,
    }
    answer:number,
}
