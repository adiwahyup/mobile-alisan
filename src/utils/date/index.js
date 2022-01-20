export const dateFormat = tanggal => {
  let date = tanggal;
  let monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let t = new Date(date);
  return t.getDate() + '-' + monthNames[t.getMonth()] + '-' + t.getFullYear();
};

export const dateStrip = date => {
  let datePart = date.match(/\d+/g),
    year = datePart[0].substring(0, 4),
    month = datePart[1],
    day = datePart[2];

  return day + '-' + month + '-' + year;
};
