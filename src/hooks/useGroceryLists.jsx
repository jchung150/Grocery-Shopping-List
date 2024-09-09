import useSWR from "swr";

import { APIs, fetcher, putter } from "../utils.js";

export function useGroceryLists() {
  const { data = [], mutate } = useSWR({ url: APIs.GroceryLists }, fetcher);

  return {
    data,
    async newList(newListName, icon) {
      return await mutate(
        await putter({
          url: APIs.GroceryListAdd,
          name: newListName,
          icon: icon || "List",
        }),
        {
          populateCache: false,
          optimisticData: (oldData) => [
            ...oldData,
            { name: newListName, icon: icon || "List", data: [] },
          ],
        }
      );
    },
    async updateList(listToUpdate, newListName) {
      await mutate(
        await putter({
          url: APIs.GroceryListUpdate,
          id: listToUpdate,
          name: newListName,
        }),
        {
          populateCache: false,
          optimisticData: (oldData) =>
            oldData.map((d) => {
              if (d.id === listToUpdate) {
                return { ...d, name: newListName };
              }
              return d;
            }),
        }
      );
    },
    async deleteList(listToDelete) {
      await mutate(
        await putter({
          url: APIs.GroceryListDelete,
          id: listToDelete,
        }),
        {
          populateCache: false,
          optimistData: (oldData) => {
            return oldData.filter((e) => e.id !== listToDelete);
          },
        }
      );
    },
  };
}
