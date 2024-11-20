const formatDate = (dateString) => {
    const options = {
      weekday: 'short', // "Fri"
      year: 'numeric',  // "2024"
      month: 'short',   // "Aug"
      day: '2-digit',   // "02"
    };
  
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  export default formatDate;