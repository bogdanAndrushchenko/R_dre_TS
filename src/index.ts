const name: string = 'James';
const dateOfBirth: Date = new Date('1990-01-01');
const phoneNumber: string | number = '+1234567890';
const email: string = 'my_mail@james.com';

const homeAddress: string | undefined = '123 Main St, Anytown, USA';
const driverLicense: string | null = 'D1234567';
const passportNumber: string | null = 'P9876543';
const socialSecurityNumber: string |  null = '123-45-6789';
const creditCardNumber: number | null = 4111111111111111;
const bankAccountNumber:  number | null = 123456789;
const hasChildren: boolean = true;
const numberOfChildren: number | undefined = 2;
const maritalStatus: string | null = 'Single';
const occupation: string | null = 'Software Engineer';
const employer: string | null = 'Tech Corp';

const getUserInfo = (name: string, dateOfBirth: Date, phoneNumber: string | number, email: string):void =>{
  console.log(`Name: ${name}`);
  console.log(`Date of Birth: ${dateOfBirth.toDateString()}`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log(`Email: ${email}`);
};

const getAssetInfo = (homeAddress?: string, driverLicense?: string | boolean | null, passportNumber?: string | null, socialSecurityNumber?: string | number | null, creditCardNumber?: string | number | null, bankAccountNumber?: string | number | null):void =>{
  if(homeAddress) console.log(`Home Address: ${homeAddress}`);
  if(driverLicense) console.log(`Driver License: ${driverLicense}`);
  if(passportNumber) console.log(`Passport Number: ${passportNumber}`);
  if(socialSecurityNumber) console.log(`Social Security Number: ${socialSecurityNumber}`);
  if(creditCardNumber) console.log(`Credit Card Number: ${creditCardNumber}`);
  if(bankAccountNumber) console.log(`Bank Account Number: ${bankAccountNumber}`);
};

const getPersonalInfo = (hasChildren: boolean, numberOfChildren?: number | null, maritalStatus?: string | null, occupation?: string | null, employer?: string | null):void =>{
  console.log(`Has Children: ${hasChildren}`);
  if(numberOfChildren) console.log(`Number of Children: ${numberOfChildren}`);
  if(maritalStatus) console.log(`Marital Status: ${maritalStatus}`);
  if(occupation) console.log(`Occupation: ${occupation}`);
  if(employer) console.log(`Employer: ${employer}`);
}



getUserInfo(name, dateOfBirth, phoneNumber, email);
getAssetInfo(homeAddress, driverLicense, passportNumber, socialSecurityNumber, creditCardNumber, bankAccountNumber);
getPersonalInfo(hasChildren, numberOfChildren, maritalStatus, occupation, employer);

interface User {
  name: string;
  dateOfBirth: Date;
  phoneNumber: string | number;
  email: string;
}

interface AdditionalInfo {
  homeAddress?: string;
  driverLicense?: string | boolean | null;
  passportNumber?: string | null;
  socialSecurityNumber?: string | number | null;
  creditCardNumber?: string | number | null;
  bankAccountNumber?: string | number | null;
}

interface FullUserProfile extends User, AdditionalInfo {
  hasChildren: boolean;
  numberOfChildren?: number | null;
  maritalStatus?: string | null;
  occupation?: string | null;
  employer?: string | null;
}

const userProfile: FullUserProfile = {
  name: 'James1',
  dateOfBirth: new Date('1990-02-01'),
  phoneNumber: '+0987654321',
  email: 'spam_mail@spam.com',
  homeAddress: '456 Another St, Sometown, USA',
  driverLicense: 'D7654321',
  passportNumber: 'P1234567',
  socialSecurityNumber: '987-65-4321',
  creditCardNumber: '4222 2222 2222 2222',
  bankAccountNumber: '987654321',
  hasChildren: false,
  numberOfChildren: null,
  maritalStatus: 'Married',
  occupation: 'Data Scientist',
  employer: 'Data Corp'
};

const getFullUserProfile = (profile: FullUserProfile):void => {
  console.log('Profile: => ',profile)
};

getFullUserProfile(userProfile);

type SensitiveInfo = {
  shareable: boolean;
  socialSecurityNumber?: string |  null;
  creditCardNumber?: string | null;
  bankAccountNumber?: string | null;
}

const sensitiveInfoUser1: SensitiveInfo = {
  shareable: false,
  socialSecurityNumber: null,
  creditCardNumber: null,
  bankAccountNumber: null
}

const sensitiveInfoUser2: SensitiveInfo = {
  shareable: true,
  socialSecurityNumber: '111-22-3333',
  creditCardNumber: '4333 3333 3333 3333',
  bankAccountNumber: '111222333'
}

const displaySensitiveInfo = (info: SensitiveInfo):void => {
  if(info.shareable) {
    console.log('Sensitive Info: => ', info);
  } else {
    console.log('Sensitive Info is not shareable.');
  }
}

displaySensitiveInfo(sensitiveInfoUser1);
displaySensitiveInfo(sensitiveInfoUser2);

