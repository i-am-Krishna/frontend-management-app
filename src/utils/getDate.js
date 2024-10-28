function getFormattedDate() {
    const today = new Date();
    
    const day = today.getDate();
    const dayWithSuffix = day + getDaySuffix(day);
  
    const month = today.toLocaleString('default', { month: 'short' });

    const year = today.getFullYear();  
    return `${dayWithSuffix} ${month}, ${year}`;
  }
  
  function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  export default getFormattedDate;
  
  