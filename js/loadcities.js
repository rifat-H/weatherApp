let list = document.getElementById('location');

// get cities
async function getCities() {
  let result = await fetch("asset/cities.json");

  if (result.status != 200) {
    throw "Could not fetch file";
  }

  let data = await result.json();

  return data;
}

// add cities

getCities()
  .then((data) => {
    // console.log(data);
    data.forEach((element) => {
      list.options[list.options.length] = new Option('Text 1', 'Value1');
    });
  })
  .catch((err) => {
    console.log(err);
  });
