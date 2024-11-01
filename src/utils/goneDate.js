export const isDateGone = (inputDate) => {
    if(!inputDate){
      return false
    }
    const today = new Date();
    const currentYear = today.getFullYear();
    const month = inputDate?.split(' ')[0];
    const day = parseInt(inputDate.split(' ')[1]);
    const parsedDate = new Date(`${month} ${day}, ${currentYear}`);
    return parsedDate < today;
  };
  
