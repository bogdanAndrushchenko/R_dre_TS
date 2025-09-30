type stringNull = string | null;
type stringNumber = string | number;
type stringNumberNull = stringNumber | null;
type numberNull = number | null;

const name: string = 'James';
const dateOfBirth: Date = new Date('1990-01-01');
const phoneNumber: stringNumber = '+1234567890';
const email: string = 'my_mail@james.com';

const homeAddress: string | undefined = '123 Main St, Anytown, USA';
const driverLicense: stringNull = 'D1234567';
const passportNumber: stringNull = 'P9876543';
const socialSecurityNumber: stringNull = '123-45-6789';
const creditCardNumber: numberNull = 4111111111111111;
const bankAccountNumber: numberNull = 123456789;
const hasChildren: boolean = true;
const numberOfChildren: number | undefined = 2;
const maritalStatus: stringNull = 'Single';
const occupation: stringNull = 'Software Engineer';
const employer: stringNull = 'Tech Corp';

const getUserInfo = (name: string, dateOfBirth: Date, phoneNumber: stringNumber, email: string): void => {
  console.log(`Name: ${name}`);
  console.log(`Date of Birth: ${dateOfBirth.toDateString()}`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log(`Email: ${email}`);
};

const getAssetInfo = (homeAddress?: string, driverLicense?: string | boolean | null, passportNumber?: stringNull, socialSecurityNumber?: stringNumber | null): void => {
  if (homeAddress) console.log(`Home Address: ${homeAddress}`);
  if (driverLicense) console.log(`Driver License: ${driverLicense}`);
  if (passportNumber) console.log(`Passport Number: ${passportNumber}`);
  if (socialSecurityNumber) console.log(`Social Security Number: ${socialSecurityNumber}`);
};

const getBankDetails = (creditCardNumber: numberNull, bankAccountNumber: numberNull): void => {
  console.log(`Credit Card Number: ${creditCardNumber}`);
  console.log(`Bank Account Number: ${bankAccountNumber}`);
}

const getPersonalInfo = (hasChildren: boolean, numberOfChildren?: numberNull, maritalStatus?: stringNull, occupation?: stringNull, employer?: stringNull): void => {
  console.log(`Has Children: ${hasChildren}`);
  if (numberOfChildren) console.log(`Number of Children: ${numberOfChildren}`);
  if (maritalStatus) console.log(`Marital Status: ${maritalStatus}`);
  if (occupation) console.log(`Occupation: ${occupation}`);
  if (employer) console.log(`Employer: ${employer}`);
}


getUserInfo(name, dateOfBirth, phoneNumber, email);
getAssetInfo(homeAddress, driverLicense, passportNumber, socialSecurityNumber);
getBankDetails(creditCardNumber, bankAccountNumber);
getPersonalInfo(hasChildren, numberOfChildren, maritalStatus, occupation, employer);

interface User {
  name: string;
  dateOfBirth: Date;
  phoneNumber: stringNumber;
  email: string;
}

interface AdditionalInfo {
  homeAddress?: string;
  driverLicense?: string | boolean | null;
  passportNumber?: stringNull;
  socialSecurityNumber?: stringNumberNull;
  creditCardNumber?: stringNumberNull;
  bankAccountNumber?: stringNumberNull;
}

interface FullUserProfile extends User, AdditionalInfo {
  hasChildren: boolean;
  numberOfChildren?: numberNull;
  maritalStatus?: stringNull;
  occupation?: stringNull;
  employer?: stringNull;
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

const getFullUserProfile = (profile: FullUserProfile): void => {
  console.log('Profile: => ', profile)
};

getFullUserProfile(userProfile);

type SensitiveInfo = {
  shareable: boolean;
  socialSecurityNumber?: string | null;
  creditCardNumber?: stringNull;
  bankAccountNumber?: stringNull;
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

const displaySensitiveInfo = (info: SensitiveInfo): void => {
  if (info.shareable) {
    console.log('Sensitive Info: => ', info);
  } else {
    console.log('Sensitive Info is not shareable.');
  }
}

displaySensitiveInfo(sensitiveInfoUser1);
displaySensitiveInfo(sensitiveInfoUser2);

