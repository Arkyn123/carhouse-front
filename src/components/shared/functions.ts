export function formatPhoneNumber(phoneNumber:string) {
console.log(phoneNumber);

    const cleanedNumber = phoneNumber.replace(/\D/g, '');
  
    if (cleanedNumber.startsWith('+')) {
      const countryCode = '7';
      const formattedNumber = `+${countryCode} (${cleanedNumber.slice(1, 4)}) ${cleanedNumber.slice(4, 7)} ${cleanedNumber.slice(7, 9)} ${cleanedNumber.slice(9)}`;
      return formattedNumber;
    } else {
      const countryCode = '7';
      const formattedNumber = `+${countryCode} (${cleanedNumber.slice(0, 3)}) ${cleanedNumber.slice(3, 6)} ${cleanedNumber.slice(6, 8)} ${cleanedNumber.slice(8)}`;
      return formattedNumber;
    }
  }