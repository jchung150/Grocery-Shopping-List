import useSWR from "swr";

import { APIs, fetcher, putter } from "../utils.js";

export function useGroceryItems(currentList) {
  // It triggers the fetcher function to retrieve data only for the specified currentList.
  const { data = { items: [] }, mutate } = useSWR(
    () => currentList && { url: APIs.GroceryItems, id: currentList },
    fetcher
  );

  // Each time you use the useGroceryItems hook,
  // it is tied to a specific grocery list via the currentList parameter.
  return {
    data,
    async newItem(newItemName) {
      return await mutate(
        await putter({
          url: APIs.GroceryItemsAdd,
          id: currentList,
          name: newItemName,
        }),
        {
          populateCache: false,
          optimisticData: (oldData) => ({
            ...oldData,
            items: [
              ...oldData.items,
              { name: newItemName, purchased: false, id: crypto.randomUUID() },
            ],
          }),
        }
      );
    },
    // oldData is the entire object returned from the SWR hook.
    // oldData typically contains not only the items array, but possibly other properties as well.
    async updateItem(itemToUpdate, newItemName) {
      return await mutate(
        await putter({
          url: APIs.GroceryItemsUpdate,
          id: itemToUpdate,
          name: newItemName,
        }),
        {
          populateCache: false,
          optimisticData: (oldData) => ({
            ...oldData,
            items: oldData.items.map((item) => {
              if (item.id === itemToUpdate) {
                return { ...item, name: newItemName };
              } else {
                return item;
              }
            }),
          }),
        }
      );
    },
    async deleteItem(itemToDelete) {
      return await mutate(
        await putter({
          url: APIs.GroceryItemsDelete,
          id: itemToDelete,
        }),
        {
          populateCache: false,
          optimisticData: (oldData) => ({
            ...oldData,
            items: oldData.items.filter((e) => e.id !== itemToDelete),
          }),
        }
      );
    },
  };
}
