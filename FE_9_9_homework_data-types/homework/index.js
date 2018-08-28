function findType (data) {
  return typeof data;
}

function forEach (arr, func) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    const newEl = func(arr[i]);
    if (findType(newEl) === 'boolean') {
      if (newEl) {
        newArr.push(arr[i]);
      }
    } else {
      if (findType(newEl) !== 'undefined') {
        newArr.push(newEl);
      }
    }
  }
  return newArr;
}

function map(arr, func) {
  return forEach(arr, func);
}

function filter(arr, func) {
  return forEach(arr, func);
}

function getAdultAppleLovers (data) {
  const filteredData = filter(data, (el) => el.age > 18 && el.favoriteFruit === 'apple');
  return map(filteredData, (el) => el.name);
}

function keys(data) {
  const arr = [];
  for (let key in data) {
    if (data[key]) {
      arr.push(key);
    }
  }
  return arr;
}

function values(data) {
  const arr = [];
  for (let key in data) {
    if (data[key]) {
      arr.push(data[key]);
    }
  }
  return arr;
}

function showFormattedDate(date) {
  const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = monthes[date.getMonth()];
  const year = date.getFullYear();

  return `It is ${day} of ${month}, ${year}`;
}