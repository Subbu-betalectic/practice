export function getPackages() {
  const existingPackageStr = localStorage.getItem("packages");
  if (existingPackageStr) {
    let existingPackageArr = JSON.parse(existingPackageStr);
    return existingPackageArr;
  } else {
    return [];
  }
}

export function savePackage(payload) {
  const existingPackageArr = getPackages();
  existingPackageArr.push(payload);
  localStorage.setItem("packages", JSON.stringify(existingPackageArr));
  return;
}

export function deletePackage(id) {
  const existingPackageArr = getPackages();
  let index = existingPackageArr.findIndex((item) => item.id === id);

  if (index !== -1) {
    existingPackageArr.splice(index, 1);
  }

  localStorage.setItem("packages", JSON.stringify(existingPackageArr));
  return;
}

export function getPackageById(id) {
  const existingPackageArr = getPackages();
  let packageDetails = existingPackageArr.find((item) => {
    return item.id === id;
  });
  console.log("packageDetails", packageDetails);
  return packageDetails;
}
