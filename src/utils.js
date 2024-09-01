import Dexie from "dexie";

export const db = new Dexie("grocery-list-db");

// grocery-list >> id, list-name
// grocery-list-item >> id, item-name, purchased(boolean)

db.version(1).stores({
  groceryLists: "++id, name",
  groceryItems: "++id, name, purchased, listId",
});

export const APIs = {
  GroceryLists: "grocery-lists",
  GroceryListsAdd: "grocery-lists-add",
  GroceryListsUpdate: "grocery-lists-update",
  GroceryListsDelete: "grocery-lists-delete",
  GroceryItems: "grocery-items",
  GroceryItemsAdd: "grocery-items-add",
  GroceryItemsDelete: "grocery-items-delete",
  GroceryItemsUpdate: "grocery-items-update",
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
  {
    id: 102,
    name: "Vegetables List",
    items: [
      { id: 102001, name: "Tomato", purchased: false, listId: 102 },
      { id: 102002, name: "Potato", purchased: false, listId: 102 },
      { id: 102003, name: "Carrot", purchased: false, listId: 102 },
      { id: 102004, name: "Onion", purchased: false, listId: 102 },
      { id: 102005, name: "Lettuce", purchased: false, listId: 102 },
    ],
  },
  {
    id: 103,
    name: "Dairy List",
    items: [
      { id: 103001, name: "Milk", purchased: false, listId: 103 },
      { id: 103002, name: "Cheese", purchased: false, listId: 103 },
      { id: 103003, name: "Yogurt", purchased: false, listId: 103 },
      { id: 103004, name: "Butter", purchased: false, listId: 103 },
      { id: 103005, name: "Cream", purchased: false, listId: 103 },
    ],
  },
];

export async function populateInitialData() {
  for (let list of dummyData) {
    const listId = await db.groceryLists.add({
      name: list.name,
    });
    for (let item of list.items) {
      await db.groceryItems.add({
        name: item.name,
        purchased: item.purchased,
        listId: listId,
      });
    }
  }
}

export async function initializeDatabase() {
  // Check if database is empty and populate only if it is
  const listsCount = await db.groceryLists.count();

  if (listsCount === 0) {
    await populateInitialData();
  } else {
    console.log("Database already contains initial data.");
  }
}

export async function clearAllData() {
  try {
    await db.groceryLists.clear();
    await db.groceryItems.clear();
    console.log("All initial data has been deleted.");
  } catch (error) {
    console.error("Failed to clear data:", error);
  }
}

// Fetches lists and items within each list depending on URL address
export async function fetcher({ url, ...variables }) {
  switch (url) {
    case APIs.GroceryLists:
      return db.groceryLists.toArray();
    case APIs.GroceryItems:
      return {
        ...(await db.groceryLists.get(variables.id)),
        items: await db.groceryItems.where({ listId: variables.id }).toArray(),
      };
    default:
      throw new Error(`Unknwon API ${url}`);
  }
}

// Add, update, delete data depending on URL address
export async function putter({ url, ...variables }) {
  switch (url) {
    case APIs.GroceryListsAdd:
      return db.groceryLists.add({
        name: variables.name,
        icon: variables.icon,
      });
    case APIs.GroceryListsUpdate:
      return db.groceryLists.update(variables.id, { name: variables.name });
    case APIs.GroceryListsDelete:
      return db.groceryLists.delete(variables.id);
    case APIs.GroceryItemsAdd:
      return db.groceryItems.add({
        name: variables.name,
        purchased: false,
        listId: variables.id,
      });
    case APIs.GroceryItemsDelete:
      return db.groceryItems.delete(variables.id);
    case APIs.GroceryItemsUpdate:
      return db.groceryItems.update(variables.id, {
        name: variables.name,
        purchased: !variables.purchased,
      });
    default:
      throw new Error(`Unknwon API ${url}`);
  }
}
