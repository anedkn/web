export const getMenu = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
};

export const addDish = async (dish) => {
  console.log('Добавление блюда:', dish);
  return { success: true };
};