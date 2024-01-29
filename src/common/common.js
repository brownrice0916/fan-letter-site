export const SaveLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const GetLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const RemoveLocalStorage = (key) => {
  localStorage.removeItem(key);
};
