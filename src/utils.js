import Dexie from "dexie";

export const db = new Dexie("grocery-list-db");

db.version(1).stores({
  groceryList: "++id, name",
  groceryItem: "++id, name, purchased, listId",
});

export const APIs = {
  GroceryLists: "grocery-lists",
  GroceryListAdd: "grocery-list-add",
  GroceryListUpdate: "grocery-list-update",
  GroceryListDelete: "grocery-list-delete",
  GroceryItems: "grocery-items",
  GroceryItemAdd: "grocery-item-add",
  GroceryItemDelete: "grocery-item-delete",
  GroceryItemUpdate: "grocery-item-update",
  GroceryItemToggle: "grocery-item-toggle",
};

export const dummyData = [
  {
    id: 101,
    name: "Fruits List",
    items: [
      { id: 101001, name: "Apple", purchased: false, listId: 101 },
      { id: 101002, name: "Banana", purchased: false, listId: 101 },
      { id: 101003, name: "Orange", purchased: false, listId: 101 },
      { id: 101004, name: "Grapes", purchased: false, listId: 101 },
      { id: 101005, name: "Strawberry", purchased: false, listId: 101 },
    ],
  },
];

export async function populateInitialData() {
  for (let list of dummyData) {
    const listId = await db.groceryList.add({
      name: list.name,
    });
    for (let item of list.items) {
      await db.groceryItem.add({
        name: item.name,
        purchased: item.purchased,
        listId: listId,
      });
    }
  }
}

export async function initializeDatabase() {
  const listCount = await db.groceryList.count();
  if (listCount === 0) {
    await populateInitialData();
  } else {
    console.log("Database already contains initial data.");
  }
}

// Fetches lists and items within each list depending on URL address
export async function fetcher({ url, ...variables }) {
  switch (url) {
    case APIs.GroceryLists:
      return db.groceryList.toArray();
    case APIs.GroceryItems:
      return {
        ...(await db.groceryList.get(variables.id)),
        items: await db.groceryItem.where({ listId: variables.id }).toArray(),
      };
    default:
      throw new Error(`Unknwon API ${url}`);
  }
}

// Add, update, delete data depending on URL address
export async function putter({ url, ...variables }) {
  switch (url) {
    case APIs.GroceryListAdd:
      return db.groceryList.add({
        name: variables.name,
        icon: variables.icon,
      });
    case APIs.GroceryListUpdate:
      console.log("Updating list in DB:", variables.id, variables.name);
      return db.groceryList.update(variables.id, { name: variables.name });
    // making sure to delete both list and items that belong to that list
    case APIs.GroceryListDelete:
      return db.transaction("rw", db.groceryList, db.groceryItem, async () => {
        await db.groceryItem.where({ listId: variables.id }).delete();
        await db.groceryList.delete(variables.id);
      });
    case APIs.GroceryItemAdd:
      return db.groceryItem.add({
        name: variables.name,
        purchased: false,
        listId: variables.id,
      });
    case APIs.GroceryItemDelete:
      return db.groceryItem.delete(variables.id);
    case APIs.GroceryItemUpdate:
      return db.groceryItem.update(variables.id, {
        name: variables.name,
      });
    case APIs.GroceryItemToggle:
      const item = await db.groceryItem.get(variables.id);
      return db.groceryItem.update(variables.id, {
        purchased: !item.purchased,
      });
    default:
      throw new Error(`Unknwon API ${url}`);
  }
}
