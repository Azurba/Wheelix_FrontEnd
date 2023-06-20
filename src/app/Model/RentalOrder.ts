export interface RentalOrder{
    id : number;
    trackingCode : string;
    locationName : string;
    locationAddress : string;
    carName : string;
    carType : string;
    driverName : string;
    driverPhone : string;
    driverEmail : string;
    additionals : string;
    startDate : Date;
    endDate : Date;
    total : number;
    payment : string;
}