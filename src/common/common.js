export const SaveLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const GetLocalStorage = (key) => {
  localStorage.getItem(JSON.parse(key));
};

export const RemoveLocalStorage = (key) => {
  localStorage.removeItem(key);
};
