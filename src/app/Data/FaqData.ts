import { Faq } from "../Model/Faq";

export class FaqData{
    faqArray : Array<Faq> = [
        {
            question: 'Can I rent a car at 18?',
            answer: 'In some states, you can rent a car at the age of 18; however, the legal age to rent a car in most states is 25 years old. You may rent a car at some locations between the ages of 21-24 for an additional young renter surcharge'
        },
        {
            question: 'Will Wheelix pick me up?',
            answer: 'Yes, our free pick-up service is available at non-airport locations and during normal business hours. To schedule your pick up time or make additional arrangements, please call your local rental office directly. Once picked up and back at the office, a friendly rental representative will complete your paper work and have you on the road in no time.'
        },
        {
            question: 'Is there a cancel fee?',
            answer: 'If you did not prepay for your reservation, there will not be a cancellation fee. If you prepaid for your vehicle, the following conditions will apply (applicable in US and Canada only): If you cancel your booking 24 Hours or less before your specified pick-up time, you will receive a full refund minus a cancellation fee of USD $50 / CAD $65.'
        },
        {
            question: 'What if my flight is delayed?',
            answer: 'No problem! Reservations are valid for 24 hours from the scheduled time of pick-up for delayed flights and charges will not begin until the time of pick-up.'
        },
        {
            question: 'Can I return my rental vehicle if the Wheelix location is closed?',
            answer: 'Some of our locations will allow returns after hours and will have procedures in place for your early or late return. Please check with the rental location when picking up your rental vehicle for exact procedure'
        },
        {
            question: 'What should I do if I get in an accident in a rental car?',
            answer: 'If you are in an accident, your safety is most important. Please call 911 or call the local authorities for assistance and file a police report. Then call Roadside Assistance at 1-800-999-9999, which is available 24 hours a day, to report the incident after authorities have been engaged. They will file a damage report and set up tow services for the damaged vehicle if it is no longer drivable.'
        },
        {
            question: 'What should I do if my rental car breaks down?',
            answer: 'If your rental car breaks down due to a mechanical failure and it is not drivable, be sure to get to a safe place out of traffic. Then, call roadside assistance at 1-800-999-9999 and they will help you with the towing process.'
        },
        {
            question: 'What is an International Driving Permit?',
            answer: 'If you are visiting and have a valid driver licence you may drive in USA during your visit as long as does not exceeds 3 months. An International Driving Permit (IDP) translates your government-issued driver’s license into 10 languages: English, French, Spanish, Russian, Chinese, German, Arabic, Italian, Swedish and Portuguese*.'
        },
    ];

}