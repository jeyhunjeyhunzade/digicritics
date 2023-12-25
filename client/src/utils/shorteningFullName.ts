export const shorteningFullName = (fullName: string) => {
  const nameParts = fullName?.split(" ");

  if (nameParts.length >= 2) {
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const initial = lastName.charAt(0).toUpperCase();
    return `${firstName}.${initial}`;
  } else {
    const firstName = fullName.substring(0, 10);
    return `${firstName}.`;
  }
};
